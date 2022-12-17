import { ImgUrlProduct } from "../img-url-product";

export interface ProductDto {
  id?: number;
  name?: string;
  description?: string;
  initialPrice?: number;
  startTime?: string;
  endTime?: string;
  priceStep?: number;
  reviewStatus?: number;
  auctionStatus?: number;
  category?: number;
  registerDay?: string;
  imgUrlProduct?: ImgUrlProduct;
  user?: number;
}