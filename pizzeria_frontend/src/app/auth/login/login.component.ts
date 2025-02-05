import { Component } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router){}

    // Método para iniciar sesión
  login(): void{
    console.log('Email:', this.email, 'Password:', this.password);
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (error) => {
        this.errorMessage = 'Credenciales incorrectas';
        console.error(error);
      }
    })
  }




}
