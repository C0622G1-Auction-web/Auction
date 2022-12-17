import {User} from "../user/user";
import {Product} from "../product/product";
import {Auction} from "../auction/auction";

export interface TransactionAuction {
  id?: number;
  deleteStatus?: boolean;
  auction?: Auction;
  user?: User;
  product?: Product;
}
