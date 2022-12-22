import {User} from "../model/user/user";

export interface AuctionDto {
  id?: number;
  currentPrice?: number;
  auctionTime?: string;
  user?: User;
  fullName?: string;
  userId?: number;
  productId?: number;
  maxCurrentPrice?: number;
}
