import {Product} from '../product/product';

export interface Auction {
  id?: number;
  currentPrice?: string;
  auctionTime?: string;
  product?: Product;
  auctionStatus: boolean,
  deleteStatus: boolean
}
