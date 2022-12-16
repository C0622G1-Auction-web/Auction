import {User} from "../user/user";

export interface Auction {
  id?: number;
  currentPrice: number;
  auctionTime: string;
  auctionStatus: boolean;
  deleteStatus: boolean;
  fullName: string,
  user: User;
}
