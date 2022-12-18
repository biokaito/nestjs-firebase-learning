import { doc } from '@firebase/firestore';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { COLLECTIONS, SUCCESS_MESSAGES } from 'src/constant';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SiteSettingsDto } from 'src/models/site-settings.model';

@Injectable()
export class SettingsService {
  constructor(private firebaseService: FirebaseService) {}
  private SITE_SETTINGS_ID = 'wF9wtWCChoYbbH4jzPSM';

  async getSettings(): Promise<SiteSettingsDto> {
    const docRef = doc(
      this.firebaseService.db,
      COLLECTIONS.SETTINGS,
      this.SITE_SETTINGS_ID,
    );
    const docSnap: any = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new InternalServerErrorException();
    }
    return docSnap.data();
  }

  async getBanners(): Promise<any> {
    const dbRef = collection(this.firebaseService.db, COLLECTIONS.BANNERS);
    const querySnapshot = await getDocs(dbRef);
    let banners = await querySnapshot.docs.map((doc) => doc.data());

    return banners;
  }

  async updateSettings(newSiteSettingsObj: SiteSettingsDto): Promise<string> {
    const settingRef = collection(
      this.firebaseService.db,
      COLLECTIONS.SETTINGS,
    );
    try {
      await setDoc(doc(settingRef, this.SITE_SETTINGS_ID), newSiteSettingsObj);
      return SUCCESS_MESSAGES.SUCCESS;
    } catch (error) {
      return error;
    }
  }
}
