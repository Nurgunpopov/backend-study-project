import { Master } from '../models/master'


class MasterService {

    async create(masterData: any): Promise<Master | Error> {
        const master = await Master.create(masterData);
        const results = await Master.save(master)
        if (results) {
            return results;
        }
        throw new Error('Master creation failed');
    }

    async getByID(id: number): Promise<Master | Error> {
        const master = await Master.findOneBy({id})
        if (master) {
            return master;
        }
        throw new Error(`Master with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await Master.findOneBy({ id: id });
        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await Master.save(instance);
            return instance;
        } else {
            throw new Error(`Master with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await Master.findOneBy({ id: id })
        if (res) {
            return await Master.remove(res)
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