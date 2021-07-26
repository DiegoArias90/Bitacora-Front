import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { environment } from '../../environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>( environment.URL_SERVICES + '/usuarios/roles');
  }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>( environment.URL_SERVICES + '/usuarios');
  }

  crearUsuario(usuario: Usuario): Observable<any>{
    return this.http.post<any>( environment.URL_SERVICES + '/usuarios', usuario).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }

  getUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>( environment.URL_SERVICES + '/usuarios/' + id).pipe(
      catchError( e => {
        if( e.status != 401 ){
          //this.router.navigate(['/dashboard/residentes']);
        }
        return throwError(e);
      })
    );
  }

  

  updateUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>( environment.URL_SERVICES + '/usuarios/' + usuario.id, usuario).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }

  deleteUsuario(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>( environment.URL_SERVICES + '/usuarios/' + id).pipe(
      catchError( e=> {
        return throwError(e);
      })
    );
  }

}
