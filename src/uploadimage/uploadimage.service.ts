import { uuidv4 } from '@firebase/util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FAILED_MESSAGES } from 'src/constant';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UploadimageService {
  constructor(private firebaseService: FirebaseService) {}
  private SITE_SETTINGS_IMAGE_PATH = 'SiteSettings';
  private PRODUCT_IMAGE_PATH = 'Product';
  
  async uploadImage(file: any, folderName: string): Promise<string> {
    if (!file) {
      throw new BadRequestException(FAILED_MESSAGES.FILE_NOT_FOUND);
    }

    const imagesRef = ref(
      this.firebaseService.storage,
      `${folderName}/${uuidv4()}`,
    );

    try {
      const snapshot = await uploadBytes(imagesRef, file.buffer);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
        return error
    }
    
  }

  async uploadImageSiteSettings(
    file: Blob | Uint8Array | ArrayBuffer,
  ): Promise<string> {
    return this.uploadImage(file, this.SITE_SETTINGS_IMAGE_PATH);
  }

  async uploadImageProduct(
    file: Blob | Uint8Array | ArrayBuffer,
  ): Promise<string> {
    return this.uploadImage(file, this.PRODUCT_IMAGE_PATH);
  }
}
