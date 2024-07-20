import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { Sesion } from '../interfaces/sesion';
import { ApiResponse } from '../../interfaces/api-response';
import { Registro } from '../interfaces/registro';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string = enviroment.apiUrl + 'usuario/';

  constructor(private http: HttpClient) {}

  iniciarSesion(request: Login): Observable<Sesion> {
    return this.http.post<Sesion>(`${this.baseUrl}login`, request);
  }

  lista(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  registrar(request: Registro): Observable<Sesion> {
    return this.http.post<Sesion>(`${this.baseUrl}registro`, request);
  }

  listadoRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}listadoRoles`);
  }
}
