import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { EmployeeRoleGuard } from 'src/guards/employee.role.guard';
import { ProjectsService } from '../services/projects.service';

@Controller('api/projects/relations')
@UseGuards(AuthGuard, EmployeeRoleGuard)
export class ProjectsWithRelationsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Res() response: Response
  ) {

    const task = await this.projectsService.findByIdWithRelations(id);
    if (!task) {
      return response.status(404).send({ error: 'Project not found' });
    }

    return response.status(200).send(task);
  }
}