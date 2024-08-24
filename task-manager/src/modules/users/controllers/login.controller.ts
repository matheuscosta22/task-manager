import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/login.service';

@Controller('api/login')
export class LoginController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async create(@Body() data: LoginDto, @Res() response: Response) {
    const login = await this.authService.login(data);
    if (!login.access_token) {
      return response.status(401).send({ error: 'Unauthorized' });
    }

    return response.status(200).send(login);
  }
}