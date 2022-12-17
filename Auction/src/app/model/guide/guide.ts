import { title } from 'process';

export interface Guide {
  id?: number;
  title?: string;
  content?: string;
  deleteStatus?: boolean;
  images?:any
}
