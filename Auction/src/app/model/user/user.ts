
import {Account} from "../account/account";
import {UserType} from "./user-type";
import {Address} from "./address";

export interface User {
  id?:number;
  firstName?:string;
  lastName?:string;
  email?:string;
  phone?:string;
  pointDedication?:number;
  birthDay?:string;
  idCard?:string;
  avatar?:string;
  address:Address;
  userType:UserType;
  account: Account;
}
