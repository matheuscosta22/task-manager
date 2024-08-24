import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoginController } from './controllers/login.controller';
import { AuthService } from './services/login.service';
import { ResponsiblesUserController } from './controllers/responsibles.user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController, LoginController, ResponsiblesUserController],
    providers: [UsersService, AuthService],
})
export class UsersModule { }