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
    return this.http.get<EmployeeInterface[]>(`${this.baseUrl}/employees/getEmployees`);
  }
}
