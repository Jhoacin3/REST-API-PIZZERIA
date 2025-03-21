import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TablesInterface} from '../models/tables-interface';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = environment.apiBaseUrl

  constructor(private http: HttpClient){}

  //metodo que retorna el numero de mesas
  GetNumberTables(): Observable<TablesInterface[]>{
    return this.http.get<TablesInterface[]>(`${this.baseUrl}/orderPayment/getTableNumbers`, { 
      withCredentials: true //permite que la cookie sea guardada en el navegador
    } );
  }

}
