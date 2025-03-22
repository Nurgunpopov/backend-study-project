import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'numeric', unique: true })
    masterId: number;

    @Column({type: 'numeric', nullable: true})
    userId: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 500})
    description: string;

    @Column({type: 'varchar', length: 300})
    lookingFor: string;

    @Column({type: 'numeric'})
    maxStudents: number;

    @Column({type: 'numeric'})
    studentsAmount: number;

    @Column({type: 'varchar', length: 20})
    status: string;

    // Статусы:
    // 1 - "Не подтвержден"
    // 2 - "На проверке темы"
    // 3 - "Формирование команды"
    // 4 - "Работа команды"
}