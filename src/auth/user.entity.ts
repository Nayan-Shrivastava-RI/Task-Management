import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm"
import { Task } from "src/tasks/task.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @OneToMany(_type => Task, task => task.user, { eager: true })
    tasks: Task[];
}