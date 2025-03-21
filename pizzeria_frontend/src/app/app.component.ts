import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {  MenuListComponent} from "./features/dashboard/pages/menu-list/menu-list.component";
import { MenuService } from './core/services/menu.service';
import { MenuItemModel } from './core/models/menu-item.model';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component';
import {MaterialModule} from './material-module';
import { FormsModule } from '@angular/forms'; // 👈 Asegúrate de importar esto
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet, RouterModule, SidebarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isAuthenticated: boolean = false;
  isLoginRoute: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });

    // Suscribirse a cambios de ruta para ocultar el sidebar en /login
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = event.url === '/login';
      }
    });
  }
}
