import {User} from "./user";

export interface Nofication {
   id?: number;
   message?: string;
   date?: string;
   user?: User;
   link?: string
   status?: number;
   isAdmin: boolean;
}
