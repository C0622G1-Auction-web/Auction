import {UserType} from './user-type';
import {Address} from './address';

export interface User {
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
