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

@Controller('api/projects/task/select')
@UseGuards(AuthGuard, EmployeeRoleGuard)
export class ProjectsToTaskSelectController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  async find(
    @Res() response: Response
  ) {
    return response.status(200).send(
      await this.projectsService.findAllToTaskSelect()
    );
  }
}