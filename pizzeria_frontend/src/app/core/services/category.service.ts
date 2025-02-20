import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../models/category-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BaseURL = 'http://localhost:4000/apiPizza/categories/getCategory';
  

  constructor(private http: HttpClient) { }
  //metodo que obtiene las categorias
  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(this.BaseURL);
  }
}
