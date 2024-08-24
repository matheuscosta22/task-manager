import { Injectable } from '@nestjs/common';
import { EntityManager, Repository, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { ProjectDto } from '../dtos/project.dto';
import { Status } from 'src/helpers/enums/status.enum';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
        private readonly entityManager: EntityManager
    ) { }

    async create(data: ProjectDto): Promise<Project> {
        const project = new Project();
        project.title = data.title;
        project.description = data.description;
        project.status = data.status;
        project.due_date = data.due_date;
        project.responsible_id = data.responsible_id;
        project.priority = data.priority;

        await this.entityManager.save(project);

        return project;
    }

    async update(project: Project, data: ProjectDto): Promise<Project> {

        project.title = data.title;
        project.description = data.description;
        project.status = data.status;
        project.due_date = data.due_date;
        project.responsible_id = data.responsible_id;
        project.priority = data.priority;

        await this.entityManager.save(project);
        return project;
    }

    async findAll(page: number = 1, perPage: number = 10) {
        const [projects, total] = await this.projectsRepository.findAndCount({
            skip: (page - 1) * perPage,
            take: perPage,
        });

        return {
            data: projects,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async findById(id: number): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { id } });
        return project;
    }

    async findByIdWithRelations(id: number): Promise<Project> {
        const project = await this.projectsRepository.findOne({
            select: {
                responsible: {
                    id: true,
                    name: true,
                    role: true
                }
            },
            relations: ['responsible', 'tasks'],
            where: { id }
        });
        return project;
    }

    async findAllToTaskSelect() {
        const [projects, total] = await this.projectsRepository.findAndCount({
            where: {
                status: LessThan(Status.COMPLETED)
            },
            select: {
                id: true,
                title: true,
            },
        });

        return {
            data: projects,
            meta: {
                total
            },
        };
    }
}