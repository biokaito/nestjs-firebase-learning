import { IsEnum, IsNotEmpty } from 'class-validator';

export enum OrderStatus {
  SHIPPED = 'SHIPPED',
  AWAITING_SHIPMENT = 'AWAITING_SHIPMENT',
  CANCELED = 'CANCELED',
}

class ICustomer {
  id: string | number;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone_number: string;
  @IsNotEmpty()
  address: string;
  status: string;
}

class IProduct {
  id: string | number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  price: number;
}

export class OrderDto {
  id: string | number;
  tracking_number: string;
  @IsNotEmpty()
  customer: ICustomer;
  @IsNotEmpty()
  total: number;
  @IsNotEmpty()
  shipping_fee: number;
  @IsNotEmpty()
  payment_gateway: string;
  @IsNotEmpty()
  products: IProduct[];
  note?: string;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
