import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"


interface IComplimentsRequest{
    tag_id: string
    user_sender: string
    user_receiver: string
    message: string
}

class CreateComplimentService{

    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentsRequest){

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)

        if (user_sender === user_receiver) {
            throw new Error("You Can Not Send a Compliment To Yourself!")
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver)

        if (!userReceiverExists) {
            throw new Error("User Receiver Does Not Exists!")
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentsRepositories.save(compliment)

        return compliment

    }
}

export { CreateComplimentService }