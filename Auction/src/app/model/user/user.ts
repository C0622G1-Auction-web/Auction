import {Address} from "./address";
import {UserType} from "./user-type";
import {Account} from "../account/account";

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
 account:Account;
}
