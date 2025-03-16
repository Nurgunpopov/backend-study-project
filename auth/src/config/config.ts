import dotenv from 'dotenv'

dotenv.config()

class Settings {
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    JWT_TOKEN_TYPE = process.env.JWT_TOKEN_TYPE
}

const settings = new Settings();

export default settings
