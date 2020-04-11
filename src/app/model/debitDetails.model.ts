export interface DebitDetails {
  id?: string,
  date?:string,
  customerName?:string,
  customerAddress?:string,
  customerContact?:string,
  totalAmount?:number,
  debitAmount?:number,
  creditAmount?:number,
  history?:any[],
}