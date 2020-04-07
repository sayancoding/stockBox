import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private _billingSource = new Subject<String>();
  invoiceData$ = this._billingSource.asObservable();

  constructor() { }

  gettingData(data:string)
  {
    this._billingSource.next(data);
  }
}
