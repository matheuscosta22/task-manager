import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { UsersService } from 'src/modules/users/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';
import { TasksWithResponsibleController } from './controllers/tasks.with.responsible.controller';
import { FindTasksByProjectController } from './controllers/find.tasks.by.project.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Task, User])],
    controllers: [TasksController, TasksWithResponsibleController, FindTasksByProjectController],
    providers: [TasksService, UsersService],
})
export class TasksModule { }