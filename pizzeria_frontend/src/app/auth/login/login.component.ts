import { Component } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { CreateUserInterface } from '../.././core/models/create-user-interface';
import { response } from 'express';
import { AlertService } from '../../services/alert.service.ts.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  // Método para iniciar sesión
  login(): void {
    if (!this.email || !this.password) {
      this.alertService.error('', 'Por favor, ingrese su email y contraseña');
      return;
    }
    const user: CreateUserInterface = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(user).subscribe({
      next: (response: any) => {
        console.log(response)
        if (response.success && response.tablesActive) {
          this.alertService.successLogin('', response.message).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/home']);
            }
            this.router.navigate(['/home']);
          });
        }else if (response.success && !response.tablesActive){
            this.alertService.info('Haz iniciado sesión pero...', "Parece que no haz establecido una configuración para tu negocio, ¡hagamoslo ahora!").then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/configuration-store']);
            }
            this.router.navigate(['/configuration-store']);
          });

        } 
        else {
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error('', 'Error al iniciar sesión, intente de nuevo.'),
    });
  }
}
