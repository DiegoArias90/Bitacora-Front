import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';
import { HTTPHEADERS_LOGIN } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(
    private http: HttpClient
  ) { }

  public get usuario(): Usuario{
    if( this._usuario != null ){
      return this._usuario;   
    } else if ( this._usuario == null &&  sessionStorage.getItem('usuario') != null ) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('usuario'));
}

  public get token(): string{
    if( this._token != null ){
      return this._token;   
    } else if ( this._token == null &&  sessionStorage.getItem('token') != null ) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  login( usuario: Usuario ): Observable<any>{
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>( environment.URL_LOGIN, params.toString(), { headers: HTTPHEADERS_LOGIN } );
  }

  guardarUsuario( accessToken: string ){
    let payload = this.obtenerInfoToken(accessToken); 
    this._usuario = new Usuario();
    this._usuario.id = payload.id;
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken( accessToken: string ){
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken)
  }

  obtenerInfoToken( accessToken: string ){
    if( accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerInfoToken(this.token);
    if( payload != null  && payload.user_name && payload.user_name.length > 0 ){
      return true;
    }
    return false;
  }

  logout(){
    this._token = null;
    this._usuario = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  hasRoles(role: string): boolean{
    if ( this.usuario.roles.includes(role) ){
      return true;
    }
    return false;
  }
}
