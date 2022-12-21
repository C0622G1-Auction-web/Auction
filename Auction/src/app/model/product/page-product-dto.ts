import {ProductDtoRoleAdmin} from './product-dto-role-admin';
import {Product} from "./product";

/**
 * Create by: GiangLBH
 * User for screen: Product-manager Role: Admin
 * Date: 17/12/2022
 */
export interface PageProductDto {
  content: ProductDtoRoleAdmin[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: true
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: true,
    unpaged: boolean
  },
  totalPages: number,
  last: boolean,
  totalElements: number,
  size: number,
  number: number,
  sort: {
    empty: true,
    sorted: boolean,
    unsorted: true
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean
}
