export interface ProductDto {
  id?: number,
  name?: string,
  description?: string,
  initialPrice?: number,
  startTime?: string,
  endTime?: string,
  registerDay?: string,
  priceStep?: number,
  reviewStatus?: number,
  auctionStatus?: number,
  category?: number,
  imgs?: any,
  user?: number;
}
