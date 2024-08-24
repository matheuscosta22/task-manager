import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { SeedModule } from './database/seed/seed.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
    SeedModule,
    DatabaseModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
  ]
})
export class AppModule { }
