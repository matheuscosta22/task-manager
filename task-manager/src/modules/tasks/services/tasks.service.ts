import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskDto } from '../dtos/task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        private readonly entityManager: EntityManager
    ) { }

    async create(data: TaskDto): Promise<Task> {
        const task = new Task();
        task.title = data.title;
        task.description = data.description;
        task.status = data.status;
        task.due_date = data.due_date;
        task.responsible_id = data.responsible_id;
        task.project_id = data.project_id;
        task.priority = data.priority;

        await this.entityManager.save(task);

        return task;
    }

    async update(task: Task, data: TaskDto): Promise<Task> {

        task.title = data.title;
        task.description = data.description;
        task.status = data.status;
        task.due_date = data.due_date;
        task.responsible_id = data.responsible_id;
        task.project_id = data.project_id;
        task.priority = data.priority;

        await this.entityManager.save(task);
        return task;
    }

    async findAll(page: number = 1, perPage: number = 10) {
        const [tasks, total] = await this.tasksRepository.findAndCount({
            skip: (page - 1) * perPage,
            take: perPage,
        });

        return {
            data: tasks,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }
    
    async findByProjectId(projectId: number, page: number = 1, perPage: number = 10) {
        const [tasks, total] = await this.tasksRepository.findAndCount({
            where: {project_id: projectId},
            skip: (page - 1) * perPage,
            take: perPage,
        });

        return {
            data: tasks,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async findById(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        return task;
    }

    async findByIdWithResponsible(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({
            select: {
                responsible: {
                    id: true,
                    name: true,
                    role: true
                }
            },
            relations: ['responsible'],
            where: { id }
        });
        return task;
    }

}