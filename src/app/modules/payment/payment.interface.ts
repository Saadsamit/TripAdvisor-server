import { Types } from 'mongoose';

export type TPayment = {
  user: Types.ObjectId;
  tranId: string;
  price: number;
  status: 'success' | 'failed';
};
