import { ArrayNotEmpty, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  emails: string[];
}
