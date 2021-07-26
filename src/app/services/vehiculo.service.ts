import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { VehiculoP } from '../models/vehiculoP';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(
    private http: HttpClient,
    private router: Router, ) { }

    getVehiculos():Observable<VehiculoP[]>{
      return this.http.get<VehiculoP[]>( environment.URL_SERVICES + '/vehiculosPersonas');
    }

    getVehiculo(id: number): Observable<VehiculoP>{
      return this.http.get<VehiculoP>( environment.URL_SERVICES + '/vehiculosPersonas/' + id).pipe(
        catchError( e => {
          if( e.status != 401 ){
            this.router.navigate(['/dashboard/vehiculosPersonas']);
          }
          return throwError(e);
        })
      );
    }

    crearVehiculo(vehiculo: VehiculoP): Observable<any>{
      return this.http.post<any>( environment.URL_SERVICES + '/vehiculosPersonas', vehiculo).pipe(
        catchError( e=> {
           if( e.status == 400 ){
             return throwError(e);
           }
          return throwError(e);
        })
      );
    }

    updateVehiculo(vehiculo: VehiculoP): Observable<VehiculoP>{
      return this.http.put<VehiculoP>( environment.URL_SERVICES + '/vehiculosPersonas/' + vehiculo.id, vehiculo).pipe(
        catchError( e=> {
           if( e.status == 400 ){
             return throwError(e);
           }
          return throwError(e);
        })
      );
    }
  
    deleteVehiculo(id: number): Observable<VehiculoP>{
      return this.http.delete<VehiculoP>( environment.URL_SERVICES + '/vehiculosPersonas/' + id).pipe(
        catchError( e=> {
          return throwError(e);
        })
      );
    }
}
