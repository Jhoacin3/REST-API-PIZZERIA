//Injectable es un decorador que nos permite inyectar dependencias en una clase
import { Injectable } from '@angular/core';
//HttpClient es un módulo que nos permite hacer peticiones HTTP
import { HttpClient } from '@angular/common/http';
//Observable es una clase que nos permite hacer peticiones asíncronas
import { Observable } from 'rxjs';
//MenuItemModel es la interfaz que define los atributos de un item del menú
import {MenuItemModel} from '../models/menu-item.model';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = environment.apiBaseUrl;

  //Constructor de la clase
  constructor(private http: HttpClient) { }
  
  //Método que obtiene el menú de la pizzería
  getMenuItems(): Observable<MenuItemModel[]> {
    return this.http.get<MenuItemModel[]>(`${this.baseUrl}/menu/getMenu`);
  }

  //Metodo para crear un nuevo item en el menú
  addMenuItem(menuItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/menu/addMenu`, menuItem);
  }

  //metodo para eliminar un menu
  deleteMenuItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/menu/deleteMenu/${id}`);
  }

  //metodo para editar un menu
  updateMenu(id: number, menuData: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/menu/updateMenu/${id}`, menuData);
  }

}
