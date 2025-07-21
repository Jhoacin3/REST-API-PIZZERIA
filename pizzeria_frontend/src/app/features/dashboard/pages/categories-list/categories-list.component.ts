import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryInterface } from '../../../../core/models/category-interface';
import { CategoryService } from '../../../../core/services/category.service';
import { AlertService } from '../../../../services/alert.service.ts.service';

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

  // Propiedades para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  totalItems: number = 0;
  pagesToShow: number = 5;

  dataUpCategory : any = {};
  //decimos que categoriesItems sera de del modelo instanciado (CategoryInterface)
  categoriesItems: CategoryInterface[] = [];
  paginatedData: CategoryInterface[] = [];
  constructor(
    private categoriesService: CategoryService,
    private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.getCategoriesTable();
  }

   getCategoriesTable(): void {
    this.categoriesService.getCategories().subscribe({
      next:(response: any) =>{
        if (response.success) {
          //lo que viene de respuesta en la API me lo guardas en categoriesItems
          this.categoriesItems = response.data;
          this.calculatePagination();
        }else{
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error("", 'Error al cargar la categoria.'),

    })
  }

      /**
   * Métodos de Paginación
   *
   * @returns {void} No retorna ningún valor.
   */
  calculatePagination(): void {
    this.totalItems = this.categoriesItems.length;
    this.totalPages = Math.max(
      1,
      Math.ceil(this.totalItems / this.itemsPerPage)
    );
    this.goToPage(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.categoriesItems.slice(startIndex, endIndex);
  }

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(this.pagesToShow / 2)
    );
    const endPage = Math.min(this.totalPages, startPage + this.pagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
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
          this.alertService.success('', response.message);
          this.getCategoriesTable();
          this.type = '';
        }else{
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error("", 'Error al crear la categoria.'),

    });
  }

  deleteCategories():void{
    this.categoriesService.deleteCategory(this.id).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.alertService.success('', response.message);
          this.getCategoriesTable();
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error("", 'Error al eliminar la categoria.'),
    })
  }
  updateCategory(): void{
    this.categoriesService.updateCategory(this.dataUpCategory.id_category,this.dataUpCategory).subscribe({
      next: (response: any) => {
        if (response.success) {
          // this.banderin = true
          this.alertService.success('', response.message);
          this.getCategoriesTable();
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error("", 'Error al editar la categoria.'),
    })
  }

 //FUNCIONES DE APOYO

 setIdToDelete(id_category: number){
  this.id = id_category
 }
 setIdUpdate(id:number, item: any){
  this.dataUpCategory = {...item};
 }
}
