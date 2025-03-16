import { User } from '../models/auth';
// import dataSource from '../config/data-source';
import checkPassword from '../utils/checkPassword'
import axios from 'axios'


class UserService {
    // private userRepository = dataSource.getRepository(User)
    
    async create(userData: any): Promise<User | Error> {
        const existingEmailUser = await User.findOne({ where: { email: userData.email } });
        if (existingEmailUser) {
            throw new Error('Email already exists');
        }

        const user = await User.create(userData);
        const results = await User.save(user)
        
        if (results) {
            if (userData.role == 'MASTER') {
                try {
                    await axios.post('http://localhost:8001/api/master', {
                            userId: results.id
                        })
                } catch (error) {
                    await User.delete({ id: results.id });
                    throw new Error('Failed to create master');
                }
            } else if (userData.role == 'BACHELOR') {
                try {
                    await axios.post('http://localhost:8002/api/bachelor', {
                        userId: results.id
                    })
                } catch (error) {
                    await User.delete({ id: results.id });
                    throw new Error('Failed to create master');
                }
            }
            return results;
        }
        throw new Error('User creation failed');
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.findOne({ where: { email: email }})
        if (user) {
            return { user: user, checkPassword: checkPassword(user, password) }
        }
        throw new Error("Login or password is incorrect!")
    }

    async me(user: any) {
        const currentUser = await User.findOneBy({ id: user.id })
        if (currentUser) {
            return currentUser
        }
        else {
            throw new Error("Something goes wrong")
        }
    }

    // async getByID(id: number): Promise<User|Error> {
    //     const user = await User.findByPk(id)
    //     if (user) {
    //         return user.toJSON()
    //     }
    //     throw new Error(`User with id ${id} not found`)
    // }

    // async update(userId: number, newUsername: string){
    //     const existingUsernameUser = await User.findOne({ where: { username: newUsername } });
    //     if (existingUsernameUser) {
    //         throw new Error('Username already exists');
    //     }

    //     const user = await User.findByPk(userId)
    //     if (user) {
    //         user.username = newUsername
    //         await user.save()
    //     } else {
    //         throw new Error(`User with id ${userId} not found`);
    //     }
    // }
}

export default UserService