import {Address} from "./address";
import {UserType} from "./user-type";

export interface User {
<<<<<<< HEAD
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
  id?: number,
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  pointDedication?: number,
  birthDay?: string,
  idCard?: string,
  avatar?: string,
  address?: Address,
  userType?: UserType,
  account?: Account,
  imgUrlProducts?: any
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3
}
