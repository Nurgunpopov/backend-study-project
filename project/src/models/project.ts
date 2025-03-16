import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'numeric'})
    masterId: number;

    @Column({type: 'numeric'})
    userId: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 500})
    description: string;

    @Column({type: 'varchar', length: 300})
    lookingFor: string;

    @Column({type: 'numeric'})
    maxStudents: number;

    // @Column({type: 'varchar', length: 20})
    // status: string;
}
