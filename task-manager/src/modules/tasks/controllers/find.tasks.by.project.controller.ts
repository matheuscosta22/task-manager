import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { TasksService } from '../services/tasks.service';
import { EmployeeRoleGuard } from 'src/guards/employee.role.guard';

@Controller('api/project/tasks')
@UseGuards(AuthGuard, EmployeeRoleGuard)
export class FindTasksByProjectController {
  constructor(private readonly tasksService: TasksService) { }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Res() response: Response
  ) {

    const task = await this.tasksService.findByProjectId(id, page, perPage);
    if (!task) {
      return response.status(200).send({
        data: [],
        meta: {
          total: 0,
          page,
          perPage,
          totalPages: 0,
        },
      });
    }

    return response.status(200).send(task);
  }
}