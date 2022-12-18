import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UploadimageService } from './uploadimage.service';

@Controller('uploadimage')
@UseGuards(AuthGuard())
export class UploadimageController {
  constructor(private uploadImageService: UploadimageService) {}

  @Post('/sitesettings')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageSiteSettings(@UploadedFile() file: Blob | Uint8Array | ArrayBuffer): Promise<string> {
    return this.uploadImageService.uploadImageSiteSettings(file);
  }

  @Post('/product')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageProduct(@UploadedFile() file: Blob | Uint8Array | ArrayBuffer): Promise<string> {
    return this.uploadImageService.uploadImageProduct(file);
  }
}
