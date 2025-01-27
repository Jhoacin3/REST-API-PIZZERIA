import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from '../../../../core/models/menu-item.model';
import { MenuService } from '../../../../core/services/menu.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {
  menuItems: MenuItemModel[] = [];
  //Constructor de la clase
  constructor(private menuService: MenuService) { }

  //Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe(data => {
      console.log('Respuesta de la API:', data);

      this.menuItems = data;
    });
  }


}
