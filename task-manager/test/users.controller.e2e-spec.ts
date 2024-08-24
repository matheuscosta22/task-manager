import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/modules/users/dtos/create-user.dto';
import { UpdateUserDto } from '../src/modules/users/dtos/update-user.dto';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsersController E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      role: 2,
      password: 'password',
    };
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto);

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(createUserDto.email);
  });

  it('should update an existing user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      role: 2,
      password: 'password',
    };
    const responseCreate = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto);

    expect(responseCreate.status).toBe(201);
    expect(responseCreate.body.email).toBe(createUserDto.email);

    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
      email: 'updated@example.com',
      role: 2,
    };

    const response = await request(app.getHttpServer())
      .put('/users/1')
      .send(updateUserDto);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateUserDto.name);
  });

  it('should find a user by ID', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      role: 2,
      password: 'password',
    };
    const responseCreate = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto);

    expect(responseCreate.status).toBe(201);
    expect(responseCreate.body.email).toBe(createUserDto.email);

    const response = await request(app.getHttpServer())
      .get(`/users/1`);
    expect(response.status).toBe(200);
  });

  it('should find all users', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      role: 2,
      password: 'password',
    };
    const responseCreate = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto);

    expect(responseCreate.status).toBe(201);
    expect(responseCreate.body.email).toBe(createUserDto.email);

    const response = await request(app.getHttpServer())
      .get('/users');
    expect(response.status).toBe(200);
  });


});