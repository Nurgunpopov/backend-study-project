import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Master extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'numeric', unique: true })
    userId: number;

    @Column({type: 'varchar', length: 10, nullable: true})
    group: string;
}
