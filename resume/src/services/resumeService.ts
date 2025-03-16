import { Resume } from '../models/resume'


class resumeService {

    async create(resumeData: any): Promise<Resume | Error> {
        const resume = await Resume.create(resumeData);
        const results = await Resume.save(resume)
        if (results) {
            return results;
        }
        throw new Error('Resume creation failed');
    }

    async getByID(id: number): Promise<Resume | Error> {
        const resume = await Resume.findOneBy({id})
        if (resume) {
            return resume;
        }
        throw new Error(`Resume with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await Resume.findOneBy({ id: id });
        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await Resume.save(instance);
            return instance;
        } else {
            throw new Error(`resume with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await Resume.findOneBy({ id: id })
        if (res) {
            return await Resume.remove(res)
        }
        throw new Error(`Something go wrong`)
    }

    // async update(resumeId: number, newresumeGroup: string){
    //     const resume = await resume.findOneBy({ id: resumeId });
    //     if (resume) {
    //         if (resume.group == newresumeGroup) {
    //             throw new Error('Group already exists');
    //         } else {
    //             resume.group = newresumeGroup
    //             await resume.save()
    //         }
    //     } else {
    //         throw new Error(`resume with id ${resumeId} not found`);
    //     }
    // }
}

export default resumeService