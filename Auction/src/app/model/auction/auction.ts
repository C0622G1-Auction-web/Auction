import {Payment} from '../payment/payment';
import {Product} from '../product/product';
import {User} from '../user/user';
export interface Auction {
  id?: number;
  fullName?: string;
  currentPrice?: number;
  auctionTime?: string;
  payStatus?: boolean;
  auctionStatus?: boolean;
  deleteStatus?: boolean;
  auctionDay?: string;
  user?: User;
  product?: Product;
}
