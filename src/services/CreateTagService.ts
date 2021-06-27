import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"




class CreateTagService {
    // If we'll receive only one data, we can pass directly to the parameter field on the function
    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories)

        if (!name) {
            throw new Error("Incorrect Name!")
        }

        const tagAlreadyExists = await tagsRepositories.findOne({ name })

        if (tagAlreadyExists) {
            throw new Error("A Tag with the same name already exists!")
        }

        const tag = tagsRepositories.create({ name })

        await tagsRepositories.save(tag)

        return tag
    }
}

export { CreateTagService }