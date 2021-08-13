import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Motivo } from '../models/motivo';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Bitacora } from '../models/bitacora';
import { catchError } from 'rxjs/operators';
import { Acompaniantes } from '../models/acompaniantes';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(
    private http: HttpClient,
    private authService:AuthService
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

  getBitacorasByEmpresa():Observable<Bitacora[]>{
    let empresaId = parseInt(this.authService.empresaId); 
    return this.http.get<Bitacora[]>( environment.URL_SERVICES + `/bitacora/byEmpresa/${empresaId}`);
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
    console.log('servicio', bitacora);
    
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
