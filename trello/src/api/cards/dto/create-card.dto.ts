import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { Status } from '../entities/card.entity';
import { Transform } from 'class-transformer';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  public estimate: number;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  dueDate: Date;

  @IsOptional()
  @IsArray()
  labels: string[];
}
