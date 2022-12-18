import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class SiteSettingsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  mainbannerdes: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  mainbannertitle: string;

  @IsString()
  @IsNotEmpty()
  secondbanner: string;

  @IsString()
  @IsNotEmpty()
  mainbanner: string;
}
