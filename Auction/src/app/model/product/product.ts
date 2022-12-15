import {User} from "../user/user";
import {AuctionStatus} from "../auction/auction-status";
import {ReviewStatus} from "./review-status";
import {PriceStep} from "./price-step";
import {Category} from "./category";

export interface Product {
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
  imgs?: any,
  user?: User;
}
