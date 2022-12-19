<<<<<<< HEAD
import {UserType} from './user-type';
import {Address} from './address';
import { Account } from '../account/account';
=======
import {Address} from "./address";
import {UserType} from "./user-type";
import {Account} from "../account/account";
>>>>>>> 0fdda8cd5056403da2d913d5a6c5d835cff1563b

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
