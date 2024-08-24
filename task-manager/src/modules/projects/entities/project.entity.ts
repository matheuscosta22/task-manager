import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Status } from 'src/helpers/enums/status.enum';
import { Priority } from 'src/helpers/enums/priority.enum';
import { Task } from 'src/modules/tasks/entities/task.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: Status;

    @Column()
    due_date: Date;

    @Column()
    responsible_id: number;

    @Column()
    priority: Priority;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn({ name: 'responsible_id' })
    responsible: User;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];
}