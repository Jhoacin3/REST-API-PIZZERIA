import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../models/category-interface';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.apiBaseUrl;
  

  constructor(private http: HttpClient) { }

  //metodo que obtiene las categorias
  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.baseUrl}/categories/getCategory`);
  }

  //metodo crear una categoria
  createCategory(type: string): Observable<any>{
    const category = { type };
    return this.http.post<any>(`${this.baseUrl}/categories/createCategory`, category);
  }
  deleteCategory(id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/categories/deleteCategory/${id}`);
  }

  //metodo de editar categoria
  updateCategory(id: number, categiryData: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/categories/updateCategory/${id}`,categiryData );
  }
}
