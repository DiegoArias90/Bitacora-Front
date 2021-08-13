import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitante } from '../models/visitante';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotejarInfoService {

  constructor(
    private http: HttpClient,
  ) { }

  buscarAntecedentes( visitante: Visitante ){
    return this.http.get<any>( environment.URL_SERVICES + '/bitacora/searchAntecedentes/' + visitante.cedula +'/C' ).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }

  buscarVehiculoPlaca ( placa: string){
    return this.http.get<any>( environment.URL_SERVICES + '/bitacora/searchVehiculo/' + placa ).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }
}
