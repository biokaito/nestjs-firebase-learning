import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetProductFilterDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort_by?: string;

  @IsOptional()
  limit?: string;
  
}