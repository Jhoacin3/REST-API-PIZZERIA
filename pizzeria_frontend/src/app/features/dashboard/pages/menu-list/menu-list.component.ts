import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from '../../../../core/models/menu-item.model';
import { MenuService } from '../../../../core/services/menu.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MaterialModule} from '../../../../material-module';

@Component({
  selector: 'app-menu-list',
  imports: [CommonModule, RouterOutlet,MaterialModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit {
  title = 'pizzeria_frontend';
  errorMessage = '';
  successMessage = '';

  menuItems: MenuItemModel[] = [];
  //Constructor de la clase
  constructor(private menuService: MenuService) { 

  }

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.menuItems = response.data;
          this.successMessage = response.message;
          this.errorMessage = ''; // Limpiamos posibles errores previos
        }else{
          this.errorMessage = response.message;
          this.successMessage = ''; // Limpiamos posibles mensajes previos
        }
      },
      error: (error) => {
        // Si ocurre un error inesperado (problema de red, etc.)
        this.errorMessage = 'Error al cargar el menú.';
        this.successMessage = '';
        console.error(error);    
      }
    })
  }


}
