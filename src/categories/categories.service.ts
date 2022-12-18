import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { COLLECTIONS, SUCCESS_MESSAGES } from 'src/constant';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class CategoriesService {
  constructor(private firebaseService: FirebaseService) {}
  private dbRef = collection(this.firebaseService.db, COLLECTIONS.CATEGORIES);
  
  async getCategories(): Promise<any[]> {
    const querySnapshot = await getDocs(this.dbRef);
    const categories = querySnapshot.docs.map((doc) => doc.data());

    return categories;
  }

  async addCategories(category): Promise<string> {
    try {
      await addDoc(this.dbRef, category);
      return SUCCESS_MESSAGES.SUCCESS;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
