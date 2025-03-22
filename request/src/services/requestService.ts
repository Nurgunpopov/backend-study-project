import axios from 'axios';
import { Request } from '../models/request'
import dataSource from '../config/data-source';

class requestService {
    private requestRepository = dataSource.getRepository(Request)

    async create(requestData: any, userId: number): Promise<Request | Error> {
        const bachelor = (await axios.get('http://resume:8002/api/bachelor/userid', {
            params: {
                userId: userId
            }
        })).data;

        if (bachelor) {
            const resume = (await axios.get('http://resume:8002/api/resume/bachelorid', {
                params: {
                    bachelorId: bachelor.id
                }
            })).data;

            const bachelorId = bachelor.id;
            const resumeId = resume.id;
            const status = "Черновик";
    
            const dataToSave = {
                ...requestData,
                resumeId,
                bachelorId,
                status,
            };
    
            const request = this.requestRepository.create(dataToSave);
            await this.requestRepository.save(request)
            const newrequest = await this.requestRepository.findOne({ where: { bachelorId: bachelorId, projectId: dataToSave.projectId } })
            
            if (newrequest) {
                return newrequest;
            } else {
                throw new Error('request creation failed');
            }
        } else {
            throw new Error('request creation failed');
        }
        throw new Error('request creation failed');
    }

    async getAll(): Promise<any | Error> {
        const allRequests = await this.requestRepository.find();
        if (allRequests) {
            return allRequests;
        }
        throw new Error(`Some problems`)
    }

    // Статусы:
    // 1 - "Черновик"
    // 2 - "В ожидании"
    // 3 - "Приглашен в команду"
    // 4 - "Приглашен по другому приоритету"
    // 5 - "Проект уже сформирован"

    // По идее, после того, как магистрант принял запрос, те статус стал "Приглашен в команду",
    // бакалавр должен подтвердить вступление в команду, нажав "Вступить в команду", только после этого он должен вступить в команду.
    // Пока сделаю так, что после того, как магистрант пригасил в команду бакалавра, бакалавр сразу вступает в комануду.


    // этот метод пока дает только сделать черновик в беловик
    async changeStatus(id: number, newStatus: string){
        const instance = await this.requestRepository.findOneBy({ id });

        // если (newStatus == "В ожидании"), ничего дополнительно не нужно делать
        // if (newStatus == "Приглашен в команду") {

        // } else if (newStatus == "Приглашен по другому приоритету") {

        // } else if (newStatus == "Проект уже сформировану") {

        // }

        if (instance) {
            instance.status = newStatus;
            await this.requestRepository.save(instance);
            return instance;
        } else {
            throw new Error(`request with id ${id} not found`);
        }
    }

    async getByID(id: number): Promise<Request | Error> {
        const request = await this.requestRepository.findOneBy({ id });
        if (request) {
            return request;
        }
        throw new Error(`request with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await this.requestRepository.findOneBy({ id });
        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await this.requestRepository.save(instance);
            return instance;
        } else {
            throw new Error(`request with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await this.requestRepository.findOneBy({ id: id })
        if (res) {
            return await this.requestRepository.remove(res)
        }
        throw new Error(`Something go wrong`)
    }

}

export default requestService