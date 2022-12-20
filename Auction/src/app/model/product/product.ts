import {PriceStep} from './price-step';
import {ReviewStatus} from './review-status';
import {AuctionStatus} from '../auction/auction-status';
import {Category} from './category';
import {User} from '../user/user';
<<<<<<< HEAD
import {ImgUrlProduct} from "./img-url-product";
=======
import {ImgUrlProduct} from './img-url-product';
>>>>>>> 5714c40573654cb9aae9819492ecce425c282eee

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  initialPrice?: number;
  startTime?: string;
  endTime?: string;
  priceStep?: PriceStep;
  reviewStatus?: ReviewStatus;
  auctionStatus?: AuctionStatus;
  category?: Category;
  maxCurrentPrice?: number;
  imgs?: any;
  registerDay?: string;
  user?: User;
<<<<<<< HEAD
  nameProduct: String;
  RegisterDay: String;
  Review: String;
  IsDelete: String;
  imgUrlProducts?: ImgUrlProduct;
=======
  isDelete?: boolean;
>>>>>>> 5714c40573654cb9aae9819492ecce425c282eee
}
