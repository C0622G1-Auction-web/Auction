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
<<<<<<< HEAD
=======
  registerDay?: string;
>>>>>>> 2b1b85a211f1209881fdd66cbe7c53bcef2e37a8
  priceStep?: PriceStep;
  reviewStatus?: ReviewStatus;
  auctionStatus?: AuctionStatus;
  category?: Category;
<<<<<<< HEAD
  registerDay?: string;
  imgUrlProduct?: ImgUrlProduct;
=======
  imgs?: any;
>>>>>>> 2b1b85a211f1209881fdd66cbe7c53bcef2e37a8
  user?: User;
}
