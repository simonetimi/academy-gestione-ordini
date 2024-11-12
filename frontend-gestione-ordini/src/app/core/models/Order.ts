import { Client } from './Client';

export interface Order {
  id: string;
  date: Date;
  state: 'IN_PROGRESS' | 'COMPLETED';
  totalPrice: number;
  client: Client;
}
