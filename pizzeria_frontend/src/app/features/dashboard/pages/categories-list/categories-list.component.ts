import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CategoryInterface } from '../../../../core/models/category-interface';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-categories-list',
  imports: [MaterialModule,CommonModule,RouterOutlet, FormsModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit {
  successMessage = "";
  errorMessage = "";
  banderin = false;
  type = "";
  id = 0
  dataUpCategory : any = {};
  //decimos que categoriesItems sera de del modelo instanciado (CategoryInterface)
  categoriesItems: CategoryInterface[] = [];
  constructor(private categoriesService: CategoryService){}

  ngOnInit(): void {
    this.getCategoriesTable();
  }

   getCategoriesTable(): void {
    this.categoriesService.getCategories().subscribe({
      next:(response: any) =>{
        if (response.success) {
          //lo que viene de respuesta en la API me lo guardas en categoriesItems
          this.categoriesItems = response.data;
          this.successMessage = response.message;
          this.errorMessage = ''; // Limpiamos posibles errores previos
        }else{
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al cargar la categoria.'),
    })
  }

   createCategories(): void{
    if(!this.type){
      this.errorMessage = 'El nombre es requerido';
      return;
    }
    this.categoriesService.createCategory(this.type).subscribe({
      next:(response) =>{
        if(response.success){
          this.banderin = true;
          this.successMessage = response.message;
          this.errorMessage ='';
          window.location.reload();
        }else{
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al crear la categoria.'),

    });
  }

  deleteCategories():void{
    this.categoriesService.deleteCategory(this.id).subscribe({
      next: (response: any) => {
        if (response.success) {
          // this.banderin = true
          this.successMessage = response.message;
          this.errorMessage = '';
          // this.getMenusTable(); // Recargar la tabla después de eliminar
          window.location.reload();

        } else {
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al eliminar el categoria.'),
    })
  }
  updateCategory(): void{
    this.categoriesService.updateCategory(this.dataUpCategory.id_category,this.dataUpCategory).subscribe({
      next: (response: any) => {
        if (response.success) {
          // this.banderin = true
          this.successMessage = response.message;
          this.errorMessage = '';
          // this.getMenusTable(); // Recargar la tabla después de eliminar
          window.location.reload();

        } else {
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al editar la categoria.'),
    })
  }

 //FUNCIONES DE APOYO

 setIdToDelete(id_category: number){
  this.id = id_category
 }
 setIdUpdate(id:number, item: any){
  this.dataUpCategory = {...item};
 }
  private handleError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }

  clearForm() {
    this.type = '';
    this.getCategoriesTable();
  }
}
