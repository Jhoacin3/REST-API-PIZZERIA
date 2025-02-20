import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmployeeInterface} from '../models/employee-interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseURL = 'http://localhost:4000/apiPizza/employees/getEmployees';

  constructor(private http: HttpClient) {}

  //Método que obtiene los empleados
  getEmployees(): Observable<EmployeeInterface[]> {
    return this.http.get<EmployeeInterface[]>(this.baseURL);
  }
}
