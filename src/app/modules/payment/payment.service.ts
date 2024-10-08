import { Request } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config';
import payment from './payment.model';

const profileVerifiedDB = async (req: Request) => {
  const tran_id = uuidv4();
  const price = 200;
  try {
    const { id, email, name } = req.user;
    const formData = {
      signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
      store_id: 'aamarpaytest',
      tran_id: tran_id,
      success_url: `${req.protocol + '://' + req.get('Host') + req.baseUrl}/confirm?tranId=${tran_id}&user=${id}&price=${price}`,
      fail_url: `${req.protocol + '://' + req.get('Host') + req.baseUrl}/fail?tranId=${tran_id}&user=${id}&price=${price}`,
      cancel_url: `${config?.client_url}/profile`,
      amount: price,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: name,
      cus_email: email,
      cus_add1: 'address',
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'N/A',
      cus_phone: 'phone',
      type: 'json',
    };

    const { data } = await axios.post(
      'https://sandbox.aamarpay.com/jsonpost.php',
      formData,
    );
    if (data.result !== 'true') {
      let errorMessage = '';
      for (const key in data) {
        errorMessage += data[key] + '. ';
      }
      throw new AppError(httpStatus.BAD_REQUEST, errorMessage);
    }
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllPaymentDB = async () => {
  return payment.find({status: "success"}).populate('user').sort('-createdAt');
};

const myPaymentDB = async (req: Request) => {
  const id = req.user.id;
  return payment.find({ user: id, status: 'success' }).sort('-createdAt');
};

const paymentService = {
  profileVerifiedDB,
  myPaymentDB,
  getAllPaymentDB,
};

export default paymentService;
