import { Request } from '../models/request'
import axios from 'axios'


class requestService {

    async create(requestData: any): Promise<Request | Error> {

        const bachelor = (await axios.get(`http://localhost:8003/api/bachelor/get`, {
            params: {
                userId: requestData.userId
            }
        })).data;

        requestData.bachelorId = bachelor.id

        const request = await Request.create(requestData);
        const results = await Request.save(request)
        if (results) {
            return results;
        }
        throw new Error('request creation failed');
    }

    async getByID(id: number): Promise<Request | Error> {
        const request = await Request.findOneBy({id})
        if (request) {
            return request;
        }
        throw new Error(`request with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await Request.findOneBy({ id: id });
        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await Request.save(instance);
            return instance;
        } else {
            throw new Error(`request with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await Request.findOneBy({ id: id })
        if (res) {
            return await Request.remove(res)
        }
        throw new Error(`Something go wrong`)
    }

    // async update(requestId: number, newrequestGroup: string){
    //     const request = await request.findOneBy({ id: requestId });
    //     if (request) {
    //         if (request.group == newrequestGroup) {
    //             throw new Error('Group already exists');
    //         } else {
    //             request.group = newrequestGroup
    //             await request.save()
    //         }
    //     } else {
    //         throw new Error(`request with id ${requestId} not found`);
    //     }
    // }
}

export default requestService