import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {  MenuListComponent} from "./features/dashboard/pages/menu-list/menu-list.component";
import { MenuService } from './core/services/menu.service';
import { MenuItemModel } from './core/models/menu-item.model';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component';
import {MaterialModule} from './material-module';
import { FormsModule } from '@angular/forms'; // 👈 Asegúrate de importar esto


@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet, RouterModule, SidebarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
