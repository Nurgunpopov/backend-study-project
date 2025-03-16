import { Bachelor } from '../models/bachelor'


class bachelorService {

    async create(bachelorData: any): Promise<Bachelor | Error> {
        const bachelor = await Bachelor.create(bachelorData);
        const results = await Bachelor.save(bachelor)
        if (results) {
            return results;
        }
        throw new Error('bachelor creation failed');
    }

    async getByID(id: number): Promise<Bachelor | Error> {
        const bachelor = await Bachelor.findOneBy({id})
        if (bachelor) {
            return bachelor;
        }
        throw new Error(`bachelor with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await Bachelor.findOneBy({ id: id });
        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await Bachelor.save(instance);
            return instance;
        } else {
            throw new Error(`bachelor with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await Bachelor.findOneBy({ id: id })
        if (res) {
            return await Bachelor.remove(res)
        }
        throw new Error(`Something go wrong`)
    }

    // async update(bachelorId: number, newbachelorGroup: string){
    //     const bachelor = await Bachelor.findOneBy({ id: bachelorId });
    //     if (bachelor) {
    //         if (bachelor.group == newbachelorGroup) {
    //             throw new Error('Group already exists');
    //         } else {
    //             bachelor.group = newbachelorGroup
    //             await bachelor.save()
    //         }
    //     } else {
    //         throw new Error(`bachelor with id ${bachelorId} not found`);
    //     }
    // }
}

export default bachelorService