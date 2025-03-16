import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Bachelor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'numeric'})
    userId: number;

    @Column({type: 'varchar', length: 10, nullable: true})
    group: string;

}
