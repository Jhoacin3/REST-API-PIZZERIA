import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from '../../../../core/models/menu-item.model';
import { CategoryInterface } from '../../../../core/models/category-interface';
import { MenuService } from '../../../../core/services/menu.service';
import { CategoryService } from '../../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material-module';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-list',
  imports: [CommonModule, RouterOutlet, MaterialModule,FormsModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  banderin = false;
  // Datos del formulario
  id = 0

  menuData = {
    name: '',
    description: '',
    price: 0,
    id_category: 0
  };

  menuItemToEdit: any = {};

  menuItems: MenuItemModel[] = [];
  categoryItem: CategoryInterface[] = [];
  

  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit(): void {
    this.getMenusTable();
    this.getCategoriesSelect();
  }
  
  private getMenusTable(): void {
    this.menuService.getMenuItems().subscribe({
      next: (response) => this.handleResponse(response, 'menuTable'),
      error: () => this.handleError('Error al cargar el menú.'),
    });
  }
  private getCategoriesSelect(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => this.handleResponse(response, 'category'),
      error: () => this.handleError('Error al cargar la categoria.'),
    });
  }
  //creacion de menu
   createMenu(): void{
    if(!this.menuData.name || !this.menuData.description || !this.menuData.price || !this.menuData.id_category){
      this.errorMessage = 'Todos los campos son requeridos';
      return;
    }
    this.menuService.addMenuItem(this.menuData).subscribe({
      next: (response) => {
        if (response.success) {
          this.banderin = true
          this.successMessage = response.message;
          this.errorMessage = '';
          this.clearForm();
        } else {
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al crear el menu.'),

    })
  }

  //metodo para editar un menu
  editMenu(): void {
    this.menuService.updateMenu(this.menuItemToEdit.id_menu ,this.menuItemToEdit).subscribe({
      next: (response) => {
        if (response.success) {
          this.banderin = true
          this.successMessage = response.message;
          this.errorMessage = '';
          this.clearForm();
        } else {
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al crear el menu.'),

    })

  }

    // Método para establecer el id del menú a eliminar
  setIdToDelete(id: number): void {
    this.id = id;
  }
  setIdUpdate(id: number, item: any) {
    this.menuItemToEdit = {...item};
  }

  //Metodo para eliminar un item en el menu
  deleteMenu():void{
    this.menuService.deleteMenuItem(this.id).subscribe({
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
      error: () => this.handleError('Error al eliminar el menu.'),

    })
  }
  //FUNCIONES DE APOYO
  private handleError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }
  trackById(index: number, item: MenuItemModel): number {
    return item.id_menu; // Si `id` es único
  }
  

private handleResponse<T>(response: any, type: 'category' | 'menuTable'): void {
  if (response.success) {
    switch (type) {
      case 'category':
        this.categoryItem = response.data as CategoryInterface[];
        break;
      case 'menuTable':
        this.menuItems = response.data as MenuItemModel[];
        break;
    }
    this.successMessage = response.message;
    this.errorMessage = '';
  } else {
    this.handleError(response.message);
  }
}

  clearForm() {
        window.location.reload();

    // this.getMenusTable();
  }



}
