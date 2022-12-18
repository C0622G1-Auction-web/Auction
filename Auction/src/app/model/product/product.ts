import {PriceStep} from './price-step';
import {ReviewStatus} from './review-status';
import {AuctionStatus} from '../auction/auction-status';
import {Category} from './category';
import {User} from '../user/user';
import {ImgUrlProduct} from "./img-url-product";

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  initialPrice?: number;
  startTime?: string;
  endTime?: string;
  deleteStatus?: boolean;
  auctions?: any;
  user?: User;
  nameProduct: String;
  RegisterDay: String;
  Review: String;
  IsDelete: String;
  registerDay?: string,
  priceStep?: PriceStep,
  reviewStatus?: ReviewStatus,
  auctionStatus?: AuctionStatus,
  category?: Category,
  imgUrlProducts?: ImgUrlProduct,
  maxCurrentPrice?: number
}
