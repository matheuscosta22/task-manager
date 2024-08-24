import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/modules/users/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';
import { Project } from './entities/project.entity';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { ProjectsWithRelationsController } from './controllers/projects.with.relations.controller';
import { ProjectsToTaskSelectController } from './controllers/projects.to.task.select.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Project, User])],
    controllers: [ProjectsController, ProjectsWithRelationsController, ProjectsToTaskSelectController],
    providers: [ProjectsService, UsersService],
})
export class ProjectsModule { }