import {PriceStep} from './price-step';
import {ReviewStatus} from './review-status';
import {AuctionStatus} from '../auction/auction-status';
import {Category} from './category';
import {User} from '../user/user';

export interface Product {
<<<<<<< HEAD
  id?: number;
  name?: string;
  description?: string;
  initialPrice?: number;
  startTime?: string;
  endTime?: string;
  deleteStatus?: boolean;
  auctions?: any;
  priceStep?: PriceStep;
  reviewStatus?: ReviewStatus;
  auctionStatus?: AuctionStatus;
  category?: Category;
  imgUrlProducts?: any;
  maxCurrentPrice?: number;
  registerDay?: string;
=======
>>>>>>> 5d7f77c59acf7ddf622cf16a4ab0428f1f3e4ebe
  user?: User;
  nameProduct: String;
  RegisterDay: String;
  Review: String;
  IsDelete: String;
  id?: number,
  name?: string,
  description?: string,
  initialPrice?: number,
  startTime?: string,
  endTime?: string,
  registerDay?: string,
  priceStep?: PriceStep,
  reviewStatus?: ReviewStatus,
  auctionStatus?: AuctionStatus,
  category?: Category,
  imgUrlProducts?: ImgUrlProduct,
  maxCurrentPrice?: number
  imgUrlProduct?: ImgUrlProduct;
}
