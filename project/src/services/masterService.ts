import { Master } from '../models/master'
import dataSource from '../config/data-source';

class MasterService {
    private masterRepository = dataSource.getRepository(Master)

    async create(masterData: any): Promise<any | Error> {
        const master = this.masterRepository.create(masterData);
        await this.masterRepository.save(master)

        const newUser = await this.masterRepository.findOne({ where: { userId: masterData.userId } }); 
        if (newUser) {
            return newUser;
        }
        throw new Error('Master creation failed');
    }

    async getByID(id: number): Promise<any | Error> {
        const master = await this.masterRepository.findOneBy({id})
        if (master) {
            return master;
        }
        throw new Error(`Master with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await this.masterRepository.findOneBy({ id: id });
        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await this.masterRepository.save(instance);
            return instance;
        } else {
            throw new Error(`Master with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await this.masterRepository.findOneBy({ id: id })
        if (res) {
            return await this.masterRepository.remove(res)
        }
        throw new Error(`Something go wrong`)
    }

    // async update(masterId: number, newMasterGroup: string){
    //     const master = await Master.findOneBy({ id: masterId });
    //     if (master) {
    //         if (master.group == newMasterGroup) {
    //             throw new Error('Group already exists');
    //         } else {
    //             master.group = newMasterGroup
    //             await master.save()
    //         }
    //     } else {
    //         throw new Error(`Master with id ${masterId} not found`);
    //     }
    // }
}

export default MasterService