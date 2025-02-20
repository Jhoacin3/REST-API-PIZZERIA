import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TablesInterface} from '../models/tables-interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private getTablesURL = 'http://localhost:4000/apiPizza/orderPayment/getTableNumbers';

  constructor(private http: HttpClient){}

  //metodo que retorna el numero de mesas
  GetNumberTables(): Observable<TablesInterface[]>{
    return this.http.get<TablesInterface[]>(this.getTablesURL)
  }

}
