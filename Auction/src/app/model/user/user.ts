import {Address} from "./address";
<<<<<<< HEAD
import {UserType} from "./user-type";

export interface User {
  id?:number,
  firstName?:string,
  lastName?:string,
  email?:string,
  phone?:string,
  pointDedication?:number,
  birthDay?:string,
  idCard?:string,
  avatar?:string,
  address:Address,
  userType:UserType,
  account: Account,
=======

export interface User {
   id?: number;
   firstName?: string;
   lastName?: string;
   email?: string;
   phone?: string;
  pointDedication?: number;
  birthDay?: string;
  idCard?: string;
  avatar?: string;
>>>>>>> 2b1b85a211f1209881fdd66cbe7c53bcef2e37a8

  deleteStatus?: boolean;
  address ?: Address;
  user?: User;
}
