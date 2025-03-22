import { Resume } from '../models/resume'
import { Bachelor } from '../models/bachelor'
import dataSource from '../config/data-source';

class resumeService {
    private resumeRepository = dataSource.getRepository(Resume)
    private bachelorRepository = dataSource.getRepository(Bachelor)

    async create(resumeData: any, userId: number): Promise<Resume | Error> {
        const bachelorData = await this.bachelorRepository.findOneBy({ userId: userId })
        const bachelorId = bachelorData.id

        const dataToSave = {
            ...resumeData,
            bachelorId,
        };

        const resume = this.resumeRepository.create(dataToSave);
        await this.resumeRepository.save(resume)
        const newResume = await this.resumeRepository.findOne({ where: { bachelorId: dataToSave.bachelorId } })
        if (newResume) {
            return newResume;
        }
        throw new Error('Resume creation failed');
    }

    async getAll(): Promise<any | Error> {
        const allResume = await this.resumeRepository.find();
        if (allResume) {
            return allResume;
        }
        throw new Error(`Some problems`)
    }

    async getByBachelorId(bachelorId: number): Promise<Resume | Error> {
        const resume = await this.resumeRepository.findOne({ where: { bachelorId: bachelorId } })

        if (resume) {
            return resume;
        }
        throw new Error(`Resume with bachelorId ${bachelorId} not found`)
    }

    async getByID(id: number): Promise<Resume | Error> {
        const resume = await this.resumeRepository.findOneBy({id});
        if (resume) {
            return resume;
        }
        throw new Error(`Resume with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await this.resumeRepository.findOneBy({ id: id });
        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await this.resumeRepository.save(instance);
            return instance;
        } else {
            throw new Error(`resume with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await this.resumeRepository.findOneBy({ id: id })
        if (res) {
            return await this.resumeRepository.remove(res)
        }
        throw new Error(`Something go wrong`)
    }
}

export default resumeService