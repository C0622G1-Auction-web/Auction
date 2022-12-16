<<<<<<< HEAD
import {Product} from '../product/product';
import {Payment} from "../payment/payment";
import {User} from "../user/user";
=======
import {Payment} from '../payment/payment';
import {Product} from '../product/product';
import {User} from '../user/user';
>>>>>>> 2b1b85a211f1209881fdd66cbe7c53bcef2e37a8

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
}
