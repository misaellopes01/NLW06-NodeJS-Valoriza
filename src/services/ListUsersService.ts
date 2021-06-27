import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"




class ListUsersService {

    async execute(){
        const usersRepositories = getCustomRepository(UsersRepositories)

        const users = await usersRepositories.find()

        return classToPlain(users);
    }
}

export { ListUsersService }