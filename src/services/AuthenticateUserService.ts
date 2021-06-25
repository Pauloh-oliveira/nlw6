import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { sign } from "jsonwebtoken"
import { compare } from "bcryptjs"


interface IAuthenticateRequest {
    email: string;
    password: string;
}
class AuthenticateUserService {
    async execute({email, password}){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect")
        }
        
        const passwordMatch =  await compare(password, user.password)
        
        if(!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            email: user.email },
            "19382f4eb5885721e32f6f449fb49077", {
                subject: user.id,
                expiresIn: "1d"
            });

            return token;
    }
}

export { AuthenticateUserService }