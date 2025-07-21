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
import { AlertService } from '../../../../services/alert.service.ts.service';

@Component({
  selector: 'app-menu-list',
  imports: [CommonModule, RouterOutlet, MaterialModule, FormsModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  banderin = false;
  // Datos del formulario
  id = 0;

  // Propiedades para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  totalItems: number = 0;
  pagesToShow: number = 5;

  menuData = {
    name: '',
    description: '',
    price: 0,
    id_category: 0,
  };

  menuItemToEdit: any = {};

  menuItems: MenuItemModel[] = [];
  paginatedData: MenuItemModel[] = [];
  categoryItem: CategoryInterface[] = [];

  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getMenusTable();
    this.getCategoriesSelect();
  }

  private getMenusTable(): void {
    this.menuService.getMenuItems().subscribe({
      next: (response) => this.handleResponse(response, 'menuTable'),
      error: () => this.alertService.error('', 'Error al cargar el menu.'),
    });
  }
  private getCategoriesSelect(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => this.handleResponse(response, 'category'),
      error: () => this.alertService.error('', 'Error al cargar la categoria.'),
    });
  }

  //LIMPIANDO INPUTS AL CREAR
  clearInputsByActions(): void{
    this.menuData = {
      name: '',
      description: '',
      price: 0,
      id_category: 0,
    };
    this.banderin = false;
  }
  //creacion de menu
  createMenu(): void {
    if (
      !this.menuData.name ||
      !this.menuData.description ||
      !this.menuData.price ||
      !this.menuData.id_category
    ) {
      this.alertService.error('', 'Todos los campos son necesarios');
      return;
    }
    this.menuService.addMenuItem(this.menuData).subscribe({
      next: (response) => {
        if (response.success) {
          this.banderin = true;
          this.alertService.success('', response.message);
          this.getMenusTable();
          this.clearInputsByActions()
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error('', 'Error al crear el menu.'),
    });
  }

  //metodo para editar un menu
  editMenu(): void {
    this.menuService
      .updateMenu(this.menuItemToEdit.id_menu, this.menuItemToEdit)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.banderin = true;
            this.alertService.success('', response.message);
            this.getMenusTable(); // Recargar la tabla después de eliminar
          } else {
            this.alertService.error('', response.error);
          }
        },
        error: () => this.alertService.error('', 'Error al editar el menu.'),
      });
  }

  // Método para establecer el id del menú a eliminar
  setIdToDelete(id: number): void {
    this.id = id;
  }
  setIdUpdate(id: number, item: any) {
    this.menuItemToEdit = { ...item };
  }

  //Metodo para eliminar un item en el menu
  deleteMenu(): void {
    this.menuService.deleteMenuItem(this.id).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.alertService.success('', response.message);
          this.getMenusTable(); // Recargar la tabla después de eliminar
          // window.location.reload();
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error('', 'Error al eliminar el menu.'),
    });
  }
  //FUNCIONES DE APOYO

  trackById(index: number, item: MenuItemModel): number {
    return item.id_menu; // Si `id` es único
  }

  private handleResponse<T>(
    response: any,
    type: 'category' | 'menuTable'
  ): void {
    if (response.success) {
      switch (type) {
        case 'category':
          this.categoryItem = response.data as CategoryInterface[];
          break;
        case 'menuTable':
          this.menuItems = response.data as MenuItemModel[];
          this.calculatePagination();
          break;
      }
    } else {
      this.alertService.error('', response.message);
    }
  }

  /**
   * Métodos de Paginación
   *
   * @returns {void} No retorna ningún valor.
   */
  calculatePagination(): void {
    this.totalItems = this.menuItems.length;
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
    this.paginatedData = this.menuItems.slice(startIndex, endIndex);
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
}
