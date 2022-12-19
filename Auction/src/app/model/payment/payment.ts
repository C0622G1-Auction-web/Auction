import {Auction} from '../auction/auction';

export interface Payment {
  id?: number;
  shippingDescription?: string;
  paymentStatus?: boolean;
  deleteStatus?: boolean;
  auction?: Auction;

}
