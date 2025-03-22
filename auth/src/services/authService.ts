import { User } from '../models/user.entity';
import dataSource from '../config/data-source';
import checkPassword from '../utils/checkPassword'
import axios from 'axios'


class UserService {
    private userRepository = dataSource.getRepository(User)
    
    async create(userData: any): Promise<User | Error> {
        const existingEmailUser = await this.userRepository.findOne({ where: { email: userData.email } });
        if (existingEmailUser) {
            throw new Error('Email already exists');
        }

        const user = this.userRepository.create(userData);
        await this.userRepository.save(user)

        const newUser = await this.userRepository.findOne({ where: { email: userData.email } }); 

        if (newUser) {
            if (userData.role == 'MASTER') {
                try {
                    await axios.post('http://project:8001/api/master/', {
                            userId: newUser.id
                        })
                    return newUser;
                } catch (error) {
                    await this.userRepository.delete({ id: newUser.id });
                    // throw new Error('Failed to create master');
                    throw new Error(error.message)
                }
            } else if (userData.role == 'BACHELOR') {
                try {
                    await axios.post('http://resume:8002/api/bachelor', {
                        userId: newUser.id
                    })
                    return newUser;
                } catch (error) {
                    await this.userRepository.delete({ id: newUser.id });
                    throw new Error('Failed to create master');
                }
            }
        }
        throw new Error('User creation failed');
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email: email }})
        if (user) {
            return { user: user, checkPassword: checkPassword(user, password) }
        }
        throw new Error("Login or password is incorrect!")
    }

    async me(user: any): Promise<User | Error> {
        const currentUser = await this.userRepository.findOneBy({ id: user.id })
        if (currentUser) {
            return currentUser
        }
        else {
            throw new Error("Something goes wrong")
        }
    }

    // async getByID(id: number): Promise<User|Error> {
    //     const user = await this.userRepository.findByPk(id)
    //     if (user) {
    //         return this.userRepository.toJSON()
    //     }
    //     throw new Error(`User with id ${id} not found`)
    // }

    // async update(userId: number, newUsername: string){
    //     const existingUsernameUser = await this.userRepository.findOne({ where: { username: newUsername } });
    //     if (existingUsernameUser) {
    //         throw new Error('Username already exists');
    //     }

    //     const user = await this.userRepository.findByPk(userId)
    //     if (user) {
    //         this.userRepository.username = newUsername
    //         await this.userRepository.save()
    //     } else {
    //         throw new Error(`User with id ${userId} not found`);
    //     }
    // }
}

export default UserService