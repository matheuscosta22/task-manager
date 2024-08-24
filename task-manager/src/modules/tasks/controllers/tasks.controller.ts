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
import { TaskDto } from '../dtos/task.dto';
import { TasksService } from '../services/tasks.service';
import { UsersService } from 'src/modules/users/services/users.service';
import { EmployeeRoleGuard } from 'src/guards/employee.role.guard';

@Controller('api/tasks')
@UseGuards(AuthGuard, EmployeeRoleGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService
  ) { }

  @Post()
  async store(
    @Body() data: TaskDto,
    @Res() response: Response
  ) {

    const responsible = await this.usersService.findById(data.responsible_id);
    if (!responsible) {
      return response.status(401).send({ error: 'Responsible not exists' });
    }

    return response.status(201).send(await this.tasksService.create(data));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: TaskDto,
    @Res() response: Response
  ) {

    const task = await this.tasksService.findById(id);
    if (!task) {
      return response.status(404).send({ error: 'Task not found' });
    }

    const responsible = await this.usersService.findById(data.responsible_id);
    if (!responsible) {
      return response.status(401).send({ error: 'Responsible not exists' });
    }

    return response.status(200).send(await this.tasksService.update(task, data));
  }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Res() response: Response
  ) {

    const task = await this.tasksService.findById(id);
    if (!task) {
      return response.status(404).send({ error: 'Task not found' });
    }

    return response.status(200).send(task);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Res() response: Response,
  ) {

    const result = await this.tasksService.findAll(page, perPage);
    return response.status(200).send(result);
  }
}