import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {  MenuListComponent} from "./menu/menu-list/menu-list.component";
import { MenuService } from './services/menu.service';
import { MenuItemModel } from './models/menu-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet, LoginComponent, MenuListComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
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
