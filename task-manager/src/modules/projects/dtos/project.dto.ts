import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Status } from 'src/helpers/enums/status.enum';
import { Priority } from 'src/helpers/enums/priority.enum';

export class ProjectDto {
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
  @IsPositive()
  @IsNotEmpty()
  responsible_id: number;
  
  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;
}