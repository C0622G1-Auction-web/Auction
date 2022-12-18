/**
 * Create by: GiangLBH
 * User for screen: Product-manager Role: Admin
 * Date: 17/12/2022
 */
export interface ProductDtoRoleAdmin {
  id?: number;
  deleteStatus?: boolean;
  name?: string;
  description?: string;
  initialPrice?: number;
  startTime?: string;
  endTime?: string;
  priceStep?: string;
  reviewStatus?: string;
  auctionStatus?: string;
  category?: string;
  registerDay?: string;
  userName?: string;
}
