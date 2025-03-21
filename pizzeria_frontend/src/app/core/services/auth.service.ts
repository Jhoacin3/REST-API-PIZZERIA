import { Injectable } from '@angular/core';
//HttpClient es un módulo que nos permite hacer peticiones HTTP
import { HttpClient } from '@angular/common/http';
//Observable y BehaviorSubject es una clase que nos permite hacer peticiones asíncronas
import { Observable, BehaviorSubject  } from 'rxjs';
import { tap } from 'rxjs/operators';
import { response } from 'express';
import { environment } from '../../environments/environments';
import { CreateUserInterface } from '../.././core/models/create-user-interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private baseUrl = environment.apiBaseUrl;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Estado reactivo
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable para suscribirse

  constructor(private http: HttpClient) {
    this.validateSession().subscribe(response => {
      this.isAuthenticatedSubject.next(response.authenticated);
    });
  }

  //Método para el logeo
  login(user: CreateUserInterface): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/auth/login`, user,
      { withCredentials: true }
    ).pipe(
      tap(response => {
        if (response.success) {
          this.isAuthenticatedSubject.next(true); // ✅ Actualiza el estado
        }
      })
    );
  }
  
  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false); // Indica que el usuario no está autenticado
      })
    );
  }

  validateSession(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/validate-session`, { withCredentials: true });
  }


  isAuthenticated(): boolean {
    return document.cookie.includes('access_token'); // ✅ Si la cookie existe, el usuario está autenticado
  }

}
