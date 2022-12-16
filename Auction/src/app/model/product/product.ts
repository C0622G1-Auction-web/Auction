import {PriceStep} from "./price-step";
import {ReviewStatus} from "./review-status";
import {AuctionStatus} from "./auction-status";
import {Category} from "./category";
import {User} from "../user/user";

export interface Product {
  id?: number;
  description?: string;
  initialPrice?: number;
  startTime?: string;
  endTime?: string;
  deleteStatus?: boolean;
  registerDay?: string;
  priceStep?: string;
  reviewStatus?: any;
  auctionStatus?: any;
  category?: any;
  imgUrlProducts?: any;
  auctions?: any;
  user?: any;
}
