import { Column, Entity, OneToMany, Unique, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { Project } from 'src/modules/projects/entities/project.entity';

@Unique(['email'])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    role: Role;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => Task, (task) => task.responsible)
    tasks: Task[];

    @OneToMany(() => Project, (project) => project.responsible)
    projects: Project[];
}