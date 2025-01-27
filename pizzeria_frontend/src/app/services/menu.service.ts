//Injectable es un decorador que nos permite inyectar dependencias en una clase
import { Injectable } from '@angular/core';
//HttpClient es un módulo que nos permite hacer peticiones HTTP
import { HttpClient } from '@angular/common/http';
//Observable es una clase que nos permite hacer peticiones asíncronas
import { Observable } from 'rxjs';
//MenuItemModel es la interfaz que define los atributos de un item del menú
import {MenuItemModel} from '../models/menu-item.model';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:3000/apiPizza/menu/getMenu';
  //Constructor de la clase
  constructor(private http: HttpClient) { }
  
  //Método que obtiene el menú de la pizzería
  getMenuItems(): Observable<MenuItemModel[]> {
    return this.http.get<MenuItemModel[]>(this.baseUrl);
  }

}
