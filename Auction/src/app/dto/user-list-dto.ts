import {Account} from "../model/account/account";
import {UserType} from "../model/user/user-type";
import {Address} from "../model/user/address";

export interface UserListDto {
  id?:number;
  firstName?:string;
  lastName?:string;
  email?:string;
  phone?:string;
  pointDedication?:number;
  address:Address;
  userType:UserType;
  account: Account;
}
