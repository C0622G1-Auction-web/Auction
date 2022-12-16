import {Address} from './address';
import {UserType} from './user-type';

export interface User {
<<<<<<< HEAD
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  pointDedication?: number;
  birthDay?: string;
  idCard?: string;
  avatar?: string;
  address: Address;
  userType: UserType;
  account: Account;
=======
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
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a

}
