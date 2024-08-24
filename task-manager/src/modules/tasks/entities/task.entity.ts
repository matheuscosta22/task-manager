import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Priority } from '../../../helpers/enums/priority.enum';
import { Status } from '../../../helpers/enums/status.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { Project } from 'src/modules/projects/entities/project.entity';

@Entity()
export class Task {
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
    priority: Priority;

    @Column()
    responsible_id: number;

    @Column({ nullable: true })
    project_id?: number | null;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'responsible_id' })
    responsible: User;

    @ManyToOne(() => Project, (project) => project.tasks, { nullable: true })
    @JoinColumn({ name: 'project_id' })
    project?: Project | null;
}