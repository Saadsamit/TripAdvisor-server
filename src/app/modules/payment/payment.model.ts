import { model, Schema } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tranId: {
    type: String,
    required: true,
  },
});

const payment = model<TPayment>('payment', paymentSchema);

export default payment;
