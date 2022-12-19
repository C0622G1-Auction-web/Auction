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
  priceStep?: PriceStep;
  reviewStatus?: ReviewStatus;
  auctionStatus?: AuctionStatus;
  category?: Category;
<<<<<<< HEAD
  maxCurrentPrice?: number;
  registerDay?: string;
  imgUrlProduct?: ImgUrlProduct;
  imgs?: any;
=======
  registerDay?: string;
  imgUrlProduct?: ImgUrlProduct;
>>>>>>> 0fdda8cd5056403da2d913d5a6c5d835cff1563b
  user?: User;
  nameProduct: String;
  RegisterDay: String;
  Review: String;
  IsDelete: String;
  imgUrlProducts?: ImgUrlProduct;
}
