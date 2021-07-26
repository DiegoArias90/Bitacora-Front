import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Motivo } from '../models/motivo';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Bitacora } from '../models/bitacora';
import { catchError } from 'rxjs/operators';
import { Acompaniantes } from '../models/acompaniantes';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getMotivo():Observable<Motivo[]>{
    return this.http.get<Motivo[]>( environment.URL_SERVICES + '/bitacora/motivos');
  }

  getBitacoras(): Observable<Bitacora[]>{
    return this.http.get<Bitacora[]>( environment.URL_SERVICES + '/bitacora'); 
  }

  getBitacoraOrdenada(): Observable<Bitacora[]>{
    return this.http.get<Bitacora[]>( environment.URL_SERVICES + '/bitacoraOrdenada'); 
  }

  getBitacora(id: number): Observable<Bitacora>{
    return this.http.get<Bitacora>( environment.URL_SERVICES + '/bitacora/' + id).pipe(
      catchError( e => {
        if( e.status != 401 ){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

 

  crearBitacora(bitacora: Bitacora): Observable<any>{
    return this.http.post<any>( environment.URL_SERVICES + '/bitacora', bitacora).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }

  crearAcompaniatesVisitantes(acompaniantes: Acompaniantes): Observable<any>{
    return this.http.post<any>( environment.URL_SERVICES + '/bitacora/acompaniates', acompaniantes).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }

  updateBitacora(bitacora: Bitacora): Observable<Bitacora>{
    return this.http.put<Bitacora>( environment.URL_SERVICES + '/bitacora/' + bitacora.id, bitacora).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }
}
