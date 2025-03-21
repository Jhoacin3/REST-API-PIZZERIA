import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmployeeInterface} from '../models/employee-interface';
import { environment } from '../../environments/environments';
import { ConfigurationInterface } from '../../core/models/configuration-interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private baseUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  //metodo para obtener todas las configuraciones
  getConfig(): Observable<ConfigurationInterface[]> {
    return this.http.get<ConfigurationInterface[]>(`${this.baseUrl}/config-store/getConfigStore`, { 
      withCredentials: true //permite que la cookie sea guardada en el navegador
    } );
  }
}
