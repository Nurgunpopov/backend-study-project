import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Request extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'numeric'})
    resumeId: number;

    @Column({type: 'numeric'})
    bachelorId: number;

    @Column({type: 'numeric'})
    projectId: number;

    @Column({type: 'varchar', length: 500})
    description: string;

    @Column({type: 'numeric'})
    priority: number;

    @Column({type: 'varchar', length: 20})
    status: String;

    // Статусы:
    // 1 - "Черновик"
    // 2 - "В ожидании"
    // 3 - "Приглашен в команду"
    // 4 - "Приглашен по другому приоритету"
    // 5 - "Проект уже сформирован"
}
