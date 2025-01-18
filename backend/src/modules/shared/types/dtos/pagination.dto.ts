import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    title: 'limit',
    description: 'The number of records per page.',
    required: false,
    example: '10',
    default: 15,
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true })
  limit?: string;

  @ApiProperty({
    title: 'page',
    description:
      "Let's say you want to get 15 (limit) records from third (3rd) page. You must send page=3. By this way, you will skip first 30 of them (first 15 and second 15).",
    required: false,
    example: '3',
    default: 1,
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true })
  page?: string;

  @ApiProperty({
    title: 'isGetAll',
    description:
      "To get all data without pagination you must give isGetAll=true. If you give false or you don't give anything, by default it is false.",
    required: false,
    example: 'true',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBooleanString()
  isGetAll?: string;
}
