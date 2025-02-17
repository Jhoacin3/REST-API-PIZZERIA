import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CategoryInterface } from '../../../../core/models/category-interface';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-categories-list',
  imports: [MaterialModule,CommonModule,RouterOutlet],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit {
  successMessage = "";
  errorMessage = "";
  //decimos que categoriesItems sera de del modelo instanciado (CategoryInterface)
  categoriesItems: CategoryInterface[] = [];
  constructor(private categoriesService: CategoryService){}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next:(response: any) =>{
        if (response.success) {
          //lo que viene de respuesta en la API me lo guardas en categoriesItems
          this.categoriesItems = response.data;
          this.successMessage = response.message;
          this.errorMessage = ''; // Limpiamos posibles errores previos
        }else{
          this.errorMessage = response.error
          this.successMessage = ''; // Limpiamos posibles mensajes previos

        }
      },
      error:(error)=>{
        // Si ocurre un error inesperado (problema de red, etc.)
        this.errorMessage = 'Error al cargar los empleados.';
        this.successMessage = '';
        console.error(error); 
      }
    })
  }



}
