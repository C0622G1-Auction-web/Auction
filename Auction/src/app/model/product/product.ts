import {PriceStep} from './price-step';
import {ReviewStatus} from './review-status';
import {AuctionStatus} from '../auction/auction-status';
import {Category} from './category';
import {User} from '../user/user';
<<<<<<< HEAD
import {ImgUrlProduct} from './img-url-product';
=======
>>>>>>> 1c04260d79ced8bb06fc31fbbc4f0d73d4a42edc

export interface Product {
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
  user?: User;
  isDelete?: boolean;
}
