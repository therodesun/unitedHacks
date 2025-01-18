import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SortingDto {
  @ApiProperty({
    title: 'sort',
    description: 'The list of columns you want to sort (seperated by commas).',
    required: false,
    example: 'createdAt,updatedAt',
    default:
      "Optional. You don't even need to send if you don't sort anything.",
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sort?: string;

  @ApiProperty({
    title: 'order',
    description:
      "The order of sorting. Let's your your sort parameter is like sort=createdAt,updatedAt. So when you send order=asc,desc it will sort createdAt in ascending order and updatedAt in descending order. (according to the order of columns)",
    required: false,
    example: 'asc or desc',
    default:
      "Optional. You don't even need to send if you don't sort anything.",
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  order?: string;
}
