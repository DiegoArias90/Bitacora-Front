import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';
import { HTTPHEADERS_LOGIN } from '../config/config';
import { catchError } from 'rxjs/operators';
import { Empresa } from '../models/empresa';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;
  private _idEmpresa: string;
  private _empresa: Empresa;
  private router: Router

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

  public get empresa(): Empresa{
    if( this._empresa != null ){
      return this._empresa;   
    } else if ( this._empresa == null &&  sessionStorage.getItem('empresa') != null ) {
      this._empresa = JSON.parse(sessionStorage.getItem('empresa')) as Empresa;
      return this._empresa;
    }
    return new Empresa();
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
    return this.http.post<any>( environment.URL_LOGIN, params.toString(), { headers: HTTPHEADERS_LOGIN } ).pipe(
      catchError( e => {
        if( e.status === 400 ){
          return throwError(e);
        }
        return throwError(e);
      })
    );;
  }

  guardarUsuario( accessToken: string ){
    let payload = this.obtenerInfoToken(accessToken); 
    this._usuario = new Usuario();
    this._usuario.id = payload.id;
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    this._usuario.empresas = payload.empresas;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken( accessToken: string ){
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken)
  }

  guardarEmpresa( id: any ){
    this._idEmpresa = id;
    sessionStorage.setItem('idEmpresa', id);
  }
  guardarEmpresaT( empresa: Empresa ){
    this._empresa = empresa;
    sessionStorage.setItem('empresa', JSON.stringify(this._empresa));
  }

  public get empresaId(): string{
    if( this._idEmpresa != null ){
      return this._idEmpresa;   
    } else if ( this._idEmpresa == null &&  sessionStorage.getItem('idEmpresa') != null ) {
      this._idEmpresa = sessionStorage.getItem('idEmpresa');
      return this._idEmpresa;
    }
    return null;
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
    sessionStorage.removeItem('empresa');
    sessionStorage.removeItem('idEmpresa');
  }

  hasRoles(role: string): boolean{
    if ( this.usuario.roles.includes(role) ){
      return true;
    }
    return false;
  }
}
