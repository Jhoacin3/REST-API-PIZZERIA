import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmployeeInterface} from '../models/employee-interface';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  //Método que obtiene los empleados
  getEmployees(): Observable<EmployeeInterface[]> {
    return this.http.get<EmployeeInterface[]>(`${this.baseUrl}/employees/getEmployees`, { 
        withCredentials: true //permite que la cookie sea guardada en el navegador
      } );
  }

  //Metodo para crear un empleado
  createEmployee(request_data: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/employees/createEmployee`, request_data);
  }

  //metodo para eliminar un empleado
  deleteEmployee(id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/employees/deleteEmployee/${id}`);
  }

  //metodo update
  updateEmployee(id: number, data: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/employees/updateEmployee/${id}`, data);
  }
}
  