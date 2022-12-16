import {User} from "./user";


​
export interface Address {
  id?: number;
  detailAddress?: string;
  town?: string;
  district?: string;
  city?: string;
  country?: string;
  user?: User;
}
