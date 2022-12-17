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
  account?: Account;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  pointDedication?: number;
  birthDay?: string;
  idCard?: string;
  avatar?: string;
  deleteStatus?: boolean;
  address?: Address;
  user?: User;
  userType: UserType;
}
