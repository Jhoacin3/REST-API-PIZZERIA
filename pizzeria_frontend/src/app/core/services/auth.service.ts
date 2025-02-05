import { Injectable } from '@angular/core';
//HttpClient es un módulo que nos permite hacer peticiones HTTP
import { HttpClient } from '@angular/common/http';
//Observable y BehaviorSubject es una clase que nos permite hacer peticiones asíncronas
import { Observable, BehaviorSubject  } from 'rxjs';
import { tap } from 'rxjs/operators';
import { response } from 'express';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //apuntando al endpoint de la API para el login
  private loginURL = 'http://localhost:3000/apiPizza/auth/login';
  private logoutURL = 'http://localhost:3000/apiPizza/auth/logout';
  //para cerrar sesion
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  constructor(private http: HttpClient) {}

  //Método para el logeo
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.loginURL, 
      { email, password },  
      { withCredentials: true } //permite que la cookie sea guardada en el navegador
     ).pipe(
      tap((response) => {
        if (response.success && response.data) {
          localStorage.setItem('access_token', response.data.token); //Nota: Almacenar token en localStorage

          this.isAuthenticatedSubject.next(true); //Nota: Notificar autenticación
        }
      })
    );
  }

  //Método para cerrar sesión
  logout(): void {
    this.http.post(this.logoutURL, {}, { withCredentials: true }).subscribe({
      next: () => {
        localStorage.removeItem('access_token'); // Eliminamos el token almacenado

        this.isAuthenticatedSubject.next(false); // Notificamos que el usuario ya no está autenticado
      },
      error: (error) => console.error('Error al cerrar sesión:', error),
    });
  }
  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Método para verificar si hay un token almacenado
  private hasToken(): boolean {
    return !!localStorage.getItem('access_token'); // Verifica si hay token en localStorage
    //Usa !! para convertir un valor a booleano (true si existe el token, false si no).
  }
}
