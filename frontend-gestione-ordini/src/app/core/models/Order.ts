import { Client } from './Client';
import { OrderProduct } from './OrderProduct';

export interface Order {
  id: string;
  date: Date;
  state: 'IN_PROGRESS' | 'COMPLETED';
  totalPrice: number;
  productsList?: OrderProduct[];
  client: Client;
}
