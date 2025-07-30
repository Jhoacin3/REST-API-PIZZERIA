import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmployeeInterface} from '../models/employee-interface';
import { environment } from '../../environments/environments';
import { ConfigurationInterface } from '../../core/models/configuration-interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  //metodo para obtener todas las configuraciones
  getConfig(): Observable<ConfigurationInterface[]> {
    return this.http.get<ConfigurationInterface[]>(
      `${this.baseUrl}/config-store/getConfigStore`,
      {
        withCredentials: true, //permite que la cookie sea guardada en el navegador
      }
    );
  }

  createConfiguration(data: any): Observable<any> {
    const { name, number_of_tables, enable, photo_url } = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('number_of_tables', number_of_tables);
    formData.append('enable', enable);
    formData.append('photo', photo_url);

    return this.http.post<any>(
      `${this.baseUrl}/config-store/createConfigStore`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
  editConfiguration(data: any): Observable<any> {
    const { id_store_info, name, number_of_tables, enable, photo_url } = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('number_of_tables', number_of_tables);
    formData.append('enable', enable);
    formData.append('photo', photo_url);
    return this.http.put<any>(
      `${this.baseUrl}/config-store/updateConfigStore/${id_store_info}`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  deleteConfig(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/config-store/deleteConfiguration/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
