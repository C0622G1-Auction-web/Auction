import {UserType} from './user-type';
import {Address} from './address';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  pointDedication?: number;
  userType?: UserType;
  email?: string;
  phone?: string;
  birthDay?: string;
  idCard?: string;
  avatar?: string;
  address: Address;
  account: Account;
  deleteStatus?: boolean;
  user?: User;
}
