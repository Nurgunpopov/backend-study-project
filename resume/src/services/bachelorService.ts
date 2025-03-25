import { Bachelor } from '../models/bachelor'
import dataSource from '../config/data-source';

class bachelorService {
    private bachelorRepository = dataSource.getRepository(Bachelor)

    async create(bachelorData: any): Promise<Bachelor | Error> {
        if (!bachelorData.userId) {
            throw new Error('Invalid data: userId is required'); 
        }
        const bachelor = this.bachelorRepository.create(bachelorData);
        await this.bachelorRepository.save(bachelor)

        const newBachelor = await this.bachelorRepository.findOne({ where: { userId: bachelorData.userId } })
        if (newBachelor) {
            return newBachelor;
        }
        // throw new Error('bachelor creation failed');
    }

    async getByUserId(userId: number): Promise<Bachelor | Error> {
        const bachelor = await this.bachelorRepository.findOne({ where: { userId: userId } })

        if (bachelor) {
            return bachelor;
        }
        throw new Error(`bachelor with userId ${userId} not found`)
    }

    async getByID(id: number): Promise<Bachelor | Error> {
        const bachelor = await this.bachelorRepository.findOneBy({id})

        if (bachelor) {
            return bachelor;
        }
        throw new Error(`bachelor with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await this.bachelorRepository.findOneBy({ id: id });

        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await this.bachelorRepository.save(instance);
            return instance;
        } else {
            throw new Error(`bachelor with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await this.bachelorRepository.findOneBy({ id: id })
        
        if (res) {
            return await this.bachelorRepository.remove(res)
        }
        throw new Error(`Something go wrong`)
    }

    // async update(bachelorId: number, newbachelorGroup: string){
    //     const bachelor = await this.bachelorRepository.findOneBy({ id: bachelorId });
    //     if (bachelor) {
    //         if (bachelor.group == newbachelorGroup) {
    //             throw new Error('Group already exists');
    //         } else {
    //             bachelor.group = newbachelorGroup
    //             await this.bachelorRepository.save()
    //         }
    //     } else {
    //         throw new Error(`bachelor with id ${bachelorId} not found`);
    //     }
    // }
}

export default bachelorService