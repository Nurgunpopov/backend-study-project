import bcrypt from "bcryptjs"

export default (user: any, password: string) => {
    return bcrypt.compareSync(password, user.password)
}