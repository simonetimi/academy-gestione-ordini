import { Client } from './Client';
import { OrderProduct } from './OrderProduct';

export interface Order {
  id: string;
  date: Date;
  state: 'IN_PROGRESS' | 'COMPLETED';
  totalPriceNoVat: number;
  totalPriceWithVat: number;
  orderProducts: OrderProduct[];
  client: Client;
}

export interface OrderDTO {
  id: string;
  date: Date;
  state: 'IN_PROGRESS' | 'COMPLETED';
  totalPriceNoVat: number;
  totalPriceWithVat: number;
  orderProductList: OrderProductListItem[];
  clientId: string;
}

interface OrderProductListItem {
  productId: string;
  quantity: number;
}

export interface OrderStateDto {
  state: 'IN_PROGRESS' | 'COMPLETED';
}
