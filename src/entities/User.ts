import { Exclude } from "class-transformer";
import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("users")
class User {
    // If the names are the same, we don't need to pass any parameters to de ()
    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    admin: boolean

    @Exclude()
    @Column()
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}

export { User }