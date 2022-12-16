import {PriceStep} from './price-step';
import {ReviewStatus} from './review-status';
import {AuctionStatus} from '../auction/auction-status';
import {Category} from './category';
import {ImgUrlProduct} from './img-url-product';
import {User} from '../user/user';

export interface ProductDtoRoleAdmin {
  id?: number;
  deleteStatus?: boolean;
  name?: string;
  description?: string;
  initialPrice?: number;
  startTime?: string;
  endTime?: string;
  priceStep?: string;
  reviewStatus?: string;
  auctionStatus?: string;
  category?: string;
  registerDay?: string;
  userName?: string;
}
