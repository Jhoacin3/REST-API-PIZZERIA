import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TablesInterface} from '../models/tables-interface';
import {CreateOrderInterface} from '../models/create-order-interface';
import { environment } from '../../environments/environments';
import { OrdersInterface } from '../models/orders-interface';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = environment.apiBaseUrl;
  private selectedTableId: number | null = null;
  private orderDataUpdate : any = {};
  private totalOrder = "";
  private orderIdSelected = 0;
  employees_id= 0;


  constructor(private http: HttpClient){}

  //metodo que retorna el numero de mesas
  GetNumberTables(): Observable<TablesInterface[]>{
    return this.http.get<TablesInterface[]>(`${this.baseUrl}/orderPayment/getTableNumbers`, { 
      withCredentials: true
    } );
  }

  getOrderAll(): Observable<OrdersInterface[]>{
    return this.http.get<OrdersInterface[]>(`${this.baseUrl}/orderPayment/getOrders`, { 
      withCredentials: true
    } );

  }
  getOrderDetails(id : number | null): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/orderPayment/getOrderDetails/${id}`, { 
      withCredentials: true
    } );

  }
  // \orderPayment
  //metodo para crear una orden
  createOrden(employees_id: number, id_table: number | null, menuDetails: CreateOrderInterface[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orderPayment/orderPayment`,
      { employees_id, 
        id_table, 
        menuDetails 
      },
      {
        withCredentials: true
      });
  }
  //metodo para pagar una orden
  orderPaid(id_order: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/orderPayment/payOrder`, { id_order }, {
      withCredentials: true
    });
  }

  updateOrder(id:number, orderDetails : any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/orderPayment/updateOrder/${id}`, orderDetails, 
      { 
      withCredentials: true
    });
  }

  deleteInsumoOrderService(id_menu: number, order_id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/orderPayment/deleteInsumoOrder/${id_menu}/${order_id}`, {
      withCredentials: true
    });
  }

  getInsumosByOrder(id_order: number, id_table: number ): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/orderPayment/getItemsByOrder/${id_order}/${id_table}`, { 
      withCredentials: true
    } );
  }

  // Método para establecer el ID de la mesa seleccionada
  setTableId(id: number): void {
    this.selectedTableId = id;
  }
  //setea los datos de una orden a actualizar desde las mesas
  setIdUpdate(orderIdSelected:number ,id:string, data: any, employees_id: number){
    this.orderDataUpdate = {...data};
    this.totalOrder= id;
    this.employees_id = employees_id;
    this.orderIdSelected = orderIdSelected;
   }

   getdataOrderUpdate():any {
    return this.orderDataUpdate;
   }
   getTotalOrderUpdate():any {
    return this.totalOrder;
   }
   getOrderIdUpdate():any {
    return this.orderIdSelected;
   }

   getEmployeeId():any {
    return this.employees_id;
   }

  // Método para obtener el ID de la mesa seleccionada
  getTableId(): number | null {
    return this.selectedTableId;
  }

}
