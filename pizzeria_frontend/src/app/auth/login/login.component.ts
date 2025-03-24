import { Component } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { CreateUserInterface } from '../.././core/models/create-user-interface';
import { response } from 'express';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router){}

    // Método para iniciar sesión
  login(): void{
    if(!this.email || !this.password){
      this.errorMessage = 'Por favor, ingrese su email y contraseña';
      return;
    }
    const user : CreateUserInterface ={
      email: this.email,
      password: this.password
    }

    this.authService.login(user).subscribe({
      next: (response: any) => {
        if(response.success){
          this.successMessage = response.message;
          this.errorMessage = '';
          this.router.navigate(['/home']) 
        }else{
          this.handleError(response.error);
        }

      },
      error: () => this.handleError('Error al iniciar sesión')
    })
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }




}
