import authService from "../services/authService"
import settings from '../config/config';
import jwt from 'jsonwebtoken';


class AuthController {
    private authService: authService;

    constructor() {
        this.authService = new authService();
    }

    register = async (request: any, response: any) => {
        const { body } = request;
        try {
            const user = await this.authService.create(body);

            response.send(user)
            // await this.authService.create(body);
            // response.send({ "status": "Профиль создан" })
        } catch (error: any) {
            if (error.message === 'Email already exists') {
                response.status(409).send({ "error": "Адрес электронной почты уже зарегистрирован" });
            } else {
                response.status(400).send({ "error": error.message });
            }
        }
    }

    auth = async (request: any, response: any) => {
        const { email, password } = request.body
        try {
            const { user, checkPassword } = await this.authService.checkPassword(email, password)
            if (checkPassword) {
                const accessToken = jwt.sign({ user: { id: user.id, userType: user.userType } }, settings.JWT_SECRET_KEY)
               
                response.status(200).send({ accessToken })
                // response.status(200).send({ "status" : "Успешный вход в систему" })
            } else {
                response.status(401).send({ "error": "Неправильный email или пароль" })
            }
        } catch (error: any) {
            if (error.message === "Login or password is incorrect!") {
                response.status(401).send({ "error": "Неправильный email или пароль" })
            } else {
                response.status(400).send({ "error": error.message })
            }
        }
    }

    verify = async (request: any, response: any) => {
        const { user } = request

        let isValid = false

        if (user) {
            isValid = true
        }

        response.send({ isValid })
    }

    me = async (request: any, response: any) => {
        const { user } = request
        try {
            const userData = await this.authService.me(user);

            response.status(200).send(userData)
        } catch (error: any) {
            response.send({ "error": error.message })
        }
    }
}

export default AuthController;
