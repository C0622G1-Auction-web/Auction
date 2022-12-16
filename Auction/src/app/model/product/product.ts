import {PriceStep} from "./price-step";
import {ReviewStatus} from "./review-status";
import {Category} from "./category";
import {AuctionStatus} from "./auction-status";
import {ImgUrlProduct} from "./img-url-product";
import {User} from "../user/user";

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
  imgUrlProducts?: ImgUrlProduct,
  maxCurrentPrice?: number
  user?: User;

}
