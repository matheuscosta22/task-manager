import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from 'src/modules/users/services/users.service';
import { EmployeeRoleGuard } from 'src/guards/employee.role.guard';
import { ProjectDto } from '../dtos/project.dto';
import { ProjectsService } from '../services/projects.service';

@Controller('api/projects')
@UseGuards(AuthGuard, EmployeeRoleGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService
  ) { }

  @Post()
  async store(
    @Body() data: ProjectDto,
    @Res() response: Response
  ) {

    const responsible = await this.usersService.findById(data.responsible_id);
    if (!responsible) {
      return response.status(401).send({ error: 'Responsible not exists' });
    }

    return response.status(201).send(await this.projectsService.create(data));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: ProjectDto,
    @Res() response: Response
  ) {

    const project = await this.projectsService.findById(id);
    if (!project) {
      return response.status(404).send({ error: 'Project not found' });
    }

    const responsible = await this.usersService.findById(data.responsible_id);
    if (!responsible) {
      return response.status(401).send({ error: 'Responsible not exists' });
    }

    return response.status(200).send(await this.projectsService.update(project, data));
  }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Res() response: Response
  ) {

    const project = await this.projectsService.findById(id);
    if (!project) {
      return response.status(404).send({ error: 'Project not found' });
    }

    return response.status(200).send(project);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Res() response: Response,
  ) {

    const result = await this.projectsService.findAll(page, perPage);
    return response.status(200).send(result);
  }
}