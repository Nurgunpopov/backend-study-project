import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm"

import hashPassword from "../utils/hashPassword";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 20})
    lastName: string;

    @Column({type: 'varchar', length: 20})
    firstName: string;

    @Column({type: 'varchar', length: 20, nullable: true})
    middleName: string;

    @Column({type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({type: 'varchar', length: 150})
    password: string;

    @Column({type: 'varchar', length: 10})
    role: 'BACHELOR' | 'MASTER' | 'LECTURER';

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = hashPassword(this.password)
    }
}
