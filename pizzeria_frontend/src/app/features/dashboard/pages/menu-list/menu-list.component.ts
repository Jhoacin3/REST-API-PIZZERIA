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
  menuData = {
    name: '',
    description: '',
    price: 0,
    id_category: 0
  };

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
      next: (response: any) => {
        this.handleResponse(response, 'menuTable')
      },
      error: (error) => {
        // Si ocurre un error inesperado (problema de red, etc.)
        this.errorMessage = 'Error al cargar el menú.';
        this.successMessage = '';
      },
    });
  }
  private getCategoriesSelect(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
      this.handleResponse(response,'category')
      },
      error: (error) => {
        // Si ocurre un error inesperado (problema de red, etc.)
        this.errorMessage = 'Error al cargar el menú.';
        this.successMessage = '';
      },
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
          window.location.reload();
        } else {
          this.errorMessage = response.error;
          this.successMessage = '';
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  private handleResponse(response: any, type: any): void {
    if (response.success) {
      if (type === 'category') {
        this.categoryItem = response.data;
      }else if (type === 'menuTable') {
        this.menuItems = response.data;
        
      }
      this.successMessage = response.message;
      this.errorMessage = '';
    } else {
      this.errorMessage = response.message;
      this.successMessage = '';
    }
  }
  clearForm() {
    this.menuData = { name: '', description: '', price: 0, id_category: 0 };
  }


}
