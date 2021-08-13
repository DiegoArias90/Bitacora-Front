import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Empresa } from '../models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(
    private http: HttpClient,
    private router: Router, ) { }


    getEmpresas():Observable<Empresa[]>{
      return this.http.get<Empresa[]>( environment.URL_SERVICES + '/empresas');
    }

    getEmpresa(id: number): Observable<Empresa>{
      return this.http.get<Empresa>( environment.URL_SERVICES + '/empresas/' + id).pipe(
        catchError( e => {
          if( e.status != 401 ){
            this.router.navigate(['/dashboard/empresas']);
          }
          return throwError(e);
        })
      );
    }

    crearEmpresa(Empresa: Empresa): Observable<any>{
      return this.http.post<any>( environment.URL_SERVICES + '/empresas', Empresa).pipe(
        catchError( e=> {
           if( e.status == 400 ){
             return throwError(e);
           }
          return throwError(e);
        })
      );
    }

    updateEmpresa(Empresa: Empresa): Observable<Empresa>{
      return this.http.put<Empresa>( environment.URL_SERVICES + '/empresas/' + Empresa.id, Empresa).pipe(
        catchError( e=> {
           if( e.status == 400 ){
             return throwError(e);
           }
          return throwError(e);
        })
      );
    }
  
    deleteEmpresa(id: number): Observable<Empresa>{
      return this.http.delete<Empresa>( environment.URL_SERVICES + '/empresas/' + id).pipe(
        catchError( e=> {
          return throwError(e);
        })
      );
    }
}