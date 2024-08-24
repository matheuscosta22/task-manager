import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Priority } from '../../../helpers/enums/priority.enum';
import { Status } from '../../../helpers/enums/status.enum';
import { Transform } from 'class-transformer';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @IsNotEmpty()
  due_date: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  responsible_id: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  project_id?: number;
}