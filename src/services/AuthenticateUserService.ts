import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"



interface IAuthenticateRequest{
    email: string
    password: string
}

class AuthenticateUserService {

    async execute( { email, password }: IAuthenticateRequest){

        const usersRepository = getCustomRepository(UsersRepositories)
        
        // Verify if email exists
        const user =  await usersRepository.findOne({ email })

        if (!user) {
            throw new Error("Email/Password Incorrect")
        }
        
        // Verify if password is correct
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email/Password Incorrect")
        }

        // generate Token
        const token = sign({
            email: user.email
        }, "dca08962d2fc78a2e8e3798a145dbc82", {
            subject: user.id,
            expiresIn: "1d"
        }) 

        return token
    }
}

export { AuthenticateUserService }