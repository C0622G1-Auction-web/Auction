import {Product} from '../product/product';
import {Payment} from "../payment/payment";
import {User} from "../user/user";

export interface Auction {
  id?: number;
  currentPrice?: number;
  auctionTime?: string;
  payStatus?: boolean;
  auctionStatus?: boolean;
  deleteStatus?: boolean;
  auctionDay?: string;
  user?: User;
  product?: Product;
  payment?: Payment;
  fullName?: string;
}
