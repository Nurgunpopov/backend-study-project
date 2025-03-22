import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Resume extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'numeric', unique: true })
    bachelorId: number;

    @Column({type: 'varchar', length: 500})
    description: string;

    @Column({type: 'varchar', length: 300})
    skills: string;
    
}
