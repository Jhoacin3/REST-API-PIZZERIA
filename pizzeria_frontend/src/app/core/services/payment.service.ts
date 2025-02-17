import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private getTablesURL = 'http://localhost:3000/apiPizza/orderPayment/getTableNumbers';

  constructor(private http: HttpClient){}

  //metodo que retorna el numero de mesas
  GetNumberTables(): Observable<number>{
    return this.http.get<number>(this.getTablesURL)
  }

}
