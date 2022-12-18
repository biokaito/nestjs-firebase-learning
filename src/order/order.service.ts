import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { uuidv4 } from '@firebase/util';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { COLLECTIONS, FAILED_MESSAGES, SUCCESS_MESSAGES } from 'src/constant';
import { FirebaseService } from 'src/firebase/firebase.service';
import { OrderStatus } from 'src/models/order.model';

@Injectable()
export class OrderService {
  constructor(private firebaseService: FirebaseService) {}
  private dbRef = collection(this.firebaseService.db, COLLECTIONS.ORDERS);
  private NUMBER_OF_ZERO = 6;
  private ZERO = '0';
  private ORDER_ID_FIELD = 'id';

  async addOrder(order: any): Promise<string> {
    try {
      const querySnapshot = await getDocs(this.dbRef);
      const { size } = querySnapshot;
      const orderedOrder = (size + 1).toString();

      // Handle new Order
      const updatedOrder = { ...order };
      updatedOrder.id = uuidv4();
      updatedOrder.status = OrderStatus.AWAITING_SHIPMENT;
      updatedOrder.tracking_number = `#00-${orderedOrder.padStart(
        this.NUMBER_OF_ZERO,
        this.ZERO,
      )}`;
      updatedOrder.createdAt = new Date();

      await addDoc(this.dbRef, updatedOrder);

      return SUCCESS_MESSAGES.SUCCESS;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOrders(): Promise<any[]> {
    const querySnapshot = await getDocs(this.dbRef);
    const orders = querySnapshot.docs.map((doc) => doc.data());

    return orders;
  }

  async getOrderQuerySnapShotByIdCustom(id: string): Promise<any> {
    const q = query(
      collection(this.firebaseService.db, COLLECTIONS.ORDERS),
      where(this.ORDER_ID_FIELD, '==', id),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  async getOrder(id: string): Promise<any> {
    const querySnapshot: any = await this.getOrderQuerySnapShotByIdCustom(id);

    if (querySnapshot?.docs[0]?.exists()) {
      const orderFound = querySnapshot.docs[0].data();

      return orderFound;
    } else {
      throw new InternalServerErrorException(FAILED_MESSAGES.ORDER_NOT_FOUND);
    }
  }

  async updateOrder(id: string, status: OrderStatus): Promise<string> {
    const querySnapshot: any = await this.getOrderQuerySnapShotByIdCustom(id);
    if (querySnapshot?.docs[0]?.exists()) {
      const orderRef = querySnapshot.docs[0].ref;

      await updateDoc(orderRef, {
        status,
      });

      return SUCCESS_MESSAGES.SUCCESS;
    } else {
      throw new InternalServerErrorException(FAILED_MESSAGES.ORDER_NOT_FOUND);
    }
  }
}
