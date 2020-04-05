import { CartProduct } from './carProduct.model';

export interface Bills
{
  id?:string,
  receiptNo?:string,
  date?:string
  customerName?:string,
  customerAddress?:string,
  customerContact?:string,
  cartedItems?:CartProduct[],
  totalAmount?:number,
  payableAmount?:number,
  dueAmount?:number
}