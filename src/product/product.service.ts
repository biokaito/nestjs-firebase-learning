import { uuidv4 } from '@firebase/util';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  limit,
  OrderByDirection,
} from 'firebase/firestore';
import { COLLECTIONS, FAILED_MESSAGES, SUCCESS_MESSAGES } from 'src/constant';
import { FirebaseService } from 'src/firebase/firebase.service';
import { GetProductFilterDto } from 'src/models/get-product.dto';
import { ProductDto } from 'src/models/product.model';

@Injectable()
export class ProductService {
  constructor(private firebaseService: FirebaseService) {}
  private dbRef = collection(this.firebaseService.db, COLLECTIONS.PRODUCTS);
  private PRODUCT_ID_FIELD = 'id';

  private getSortQuery(sort_by?: string) {
    let fieldPath = 'price';
    let directionStr: OrderByDirection = 'asc';

    if (sort_by) {
      switch (sort_by) {
        case 'highest':
          directionStr = 'desc';
          break;
        case 'new-arrival':
          fieldPath = 'createdAt';
          directionStr = 'desc';
          break;
        case 'most-order':
          fieldPath = 'quantity';
          break;

        default:
          break;
      }
    }

    return { fieldPath, directionStr };
  }

  async getProducts(productFilterDto: GetProductFilterDto): Promise<any> {
    const { category, search, sort_by = '' } = productFilterDto;
    const limitItems = productFilterDto.limit;
    
    const limitNumber: number = limitItems && parseInt(limitItems.toString()) || 999;
    const { fieldPath, directionStr } = this.getSortQuery(sort_by);
    const q = query(
      this.dbRef,
      orderBy(fieldPath, directionStr),
      limit(limitNumber),
    );
    
    const querySnapshot = await getDocs(q);
    let products = await querySnapshot.docs.map((doc) => doc.data());

    if (search) {
      products = products.filter(
        (product: ProductDto) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    let returnProducts = [];
    if (category) {
      const listCategories = category.split(',');

      const filteredProducts = await Promise.all(
        listCategories
          .map(async (category: string) => {
            const listProductIncludedCategory = products.filter(
              (product: ProductDto) =>
                product.category.toLowerCase() == category.toLowerCase(),
            );
            return listProductIncludedCategory;
          })
          .flat(),
      );
      returnProducts = filteredProducts.flatMap((x) => x);
    } else {
      returnProducts = products;
    }
    // console.log("category: ", category)
    return returnProducts;
  }

  async createProduct(product: ProductDto): Promise<string> {
    const updatedProduct = { ...product };
    updatedProduct.id = uuidv4();
    updatedProduct.createdAt = new Date();
    updatedProduct.isPublished = false;

    try {
      await addDoc(this.dbRef, updatedProduct);
      return SUCCESS_MESSAGES.SUCCESS;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getProductQuerySnapShotByIdCustom(id: string): Promise<any> {
    const q = query(
      collection(this.firebaseService.db, COLLECTIONS.PRODUCTS),
      where(this.PRODUCT_ID_FIELD, '==', id),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  async getProductByIdCustom(id: string): Promise<any> {
    const querySnapshot: any = await this.getProductQuerySnapShotByIdCustom(id);

    if (querySnapshot?.docs[0]?.exists()) {
      const orderFound = querySnapshot.docs[0].data();

      return orderFound;
    } else {
      throw new InternalServerErrorException(FAILED_MESSAGES.PRODUCT_NOT_FOUND);
    }
  }

  async updateProduct(id: string, product: ProductDto): Promise<string> {
    const querySnapshot: any = await this.getProductQuerySnapShotByIdCustom(id);
    if (querySnapshot?.docs[0]?.exists()) {
      const productRef = querySnapshot.docs[0].ref;

      await updateDoc(productRef, product);

      return SUCCESS_MESSAGES.SUCCESS;
    } else {
      throw new InternalServerErrorException(FAILED_MESSAGES.ORDER_NOT_FOUND);
    }
  }

  async deleteProduct(id: string): Promise<any> {
    const querySnapshot: any = await this.getProductQuerySnapShotByIdCustom(id);
    if (querySnapshot?.docs[0]?.exists()) {
      const productRef = querySnapshot.docs[0].ref;

      await deleteDoc(productRef);

      return SUCCESS_MESSAGES.SUCCESS;
    } else {
      throw new InternalServerErrorException(FAILED_MESSAGES.ORDER_NOT_FOUND);
    }
  }
}
