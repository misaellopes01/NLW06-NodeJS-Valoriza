import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"


class ListUserReceiveComplimentsService {

    async execute(user_id: string){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
            // We can get fully information from a query
            relations: ["userSender", "userReceiver", "tag"]
        })

        return compliments
    }
}

export { ListUserReceiveComplimentsService }