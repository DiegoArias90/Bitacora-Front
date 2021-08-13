import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { Visitante } from '../models/visitante';
import { VehiculoV } from '../models/vehiculoV';

import { environment } from '../../environments/environment';
import { AxiosInstance } from "axios";

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {

  private axiosClient: AxiosInstance;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getVisitantes():Observable<Visitante[]>{
    return this.http.get<Visitante[]>( environment.URL_SERVICES + '/visitantes');
  }

  getVehiculoVisitantes():Observable<VehiculoV[]>{
    return this.http.get<VehiculoV[]>( environment.URL_SERVICES + '/vehiculosVisitantes');
  }

  crearVisitante(visitante: Visitante): Observable<any>{
    return this.http.post<any>( environment.URL_SERVICES + '/visitantes', visitante).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }
  
  crearVehiculo( vehiculoVisitante: VehiculoV){
    return this.http.post<any>( environment.URL_SERVICES + '/vehiculosVisitantes', vehiculoVisitante).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }

  // buscarAntecedentes( visitante: Visitante ){
  //   return this.http.get<any>( environment.URL_SERVICES + '/bitacora/searchAntecedentes/' + visitante.cedula +'/'+ visitante.tipoIdentificacion ).pipe(
  //     catchError( e=> {
  //        if( e.status == 400 ){
  //          return throwError(e);
  //        }
  //       return throwError(e);
  //     })
  //   );
  // }

  // buscarVeiculoPlaca ( placa: string){
  //   return this.http.get<any>( environment.URL_SERVICES + '/bitacora/searchVehiculo/' + placa ).pipe(
  //     catchError( e=> {
  //        if( e.status == 400 ){
  //          return throwError(e);
  //        }
  //       return throwError(e);
  //     })
  //   );
  // }

}
