import {PriceStep} from './price-step';
import {ReviewStatus} from './review-status';
import {AuctionStatus} from '../auction/auction-status';
import {Category} from './category';
import {User} from '../user/user';
import { ImgUrlProduct } from './img-url-product';

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  initialPrice?: number;
  startTime?: string;
  endTime?: string;
  deleteStatus?: boolean;
  imgUrlProducts?: ImgUrlProduct[];
  auctions?: any;
  priceStep?: PriceStep;
  reviewStatus?: ReviewStatus;
  auctionStatus?: AuctionStatus;
  category?: Category;
  maxCurrentPrice?: number;
  registerDay?: string;
  imgUrlProduct?: ImgUrlProduct;
  imgs?: any;
  user?: User;
}
