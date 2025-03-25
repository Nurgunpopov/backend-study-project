import { User } from '../models/user.entity';
import dataSource from '../config/data-source';
import checkPassword from '../utils/checkPassword';
import { sendToQueue } from '../rabbitmq'

class UserService {
    private userRepository = dataSource.getRepository(User);

    async create(userData: any): Promise<User | Error> {
        const existingEmailUser = await this.userRepository.findOne({ where: { email: userData.email } });
        if (existingEmailUser) {
            throw new Error('Email already exists');
        }

        const user = this.userRepository.create(userData);
        await this.userRepository.save(user);

        const newUser = await this.userRepository.findOne({ where: { email: userData.email } });

        if (newUser) {
            try {
                const data = { userId: newUser.id }
                if (userData.role == 'MASTER') {
                    sendToQueue('master_created', data)
                } else if (userData.role == 'BACHELOR') {
                    sendToQueue('bachelor_created', data)
                }
                return newUser;
            } catch (error) {
                await this.userRepository.delete({ id: newUser.id });
                throw new Error(`Failed to publish event: ${error.message}`);
            }
        }
        throw new Error('User creation failed');
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email: email }});
        if (user) {
            return { user: user, checkPassword: checkPassword(user, password) };
        }
        throw new Error("Login or password is incorrect!");
    }

    async me(user: any): Promise<User | Error> {
        const currentUser = await this.userRepository.findOneBy({ id: user.id });
        if (currentUser) {
            return currentUser;
        }
        throw new Error("Something goes wrong");
    }
}

export default UserService;