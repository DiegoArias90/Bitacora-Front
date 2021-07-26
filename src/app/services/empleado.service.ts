import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TipoEmpleo } from '../models/tipo-empleo';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http: HttpClient,
    private router: Router, ) { }

    getTipoEmpleos():Observable<TipoEmpleo[]>{
      return this.http.get<TipoEmpleo[]>( environment.URL_SERVICES + '/empleados/tiposEmpleos');
    }


    getEmpleados():Observable<Empleado[]>{
      return this.http.get<Empleado[]>( environment.URL_SERVICES + '/empleados');
    }

    getEmpleado(id: number): Observable<Empleado>{
      return this.http.get<Empleado>( environment.URL_SERVICES + '/empleados/' + id).pipe(
        catchError( e => {
          if( e.status != 401 ){
            this.router.navigate(['/dashboard/empleados']);
          }
          return throwError(e);
        })
      );
    }

    crearEmpleado(empleado: Empleado): Observable<any>{
      return this.http.post<any>( environment.URL_SERVICES + '/empleados', empleado).pipe(
        catchError( e=> {
           if( e.status == 400 ){
             return throwError(e);
           }
          return throwError(e);
        })
      );
    }

    updateEmpleado(empleado: Empleado): Observable<Empleado>{
      return this.http.put<Empleado>( environment.URL_SERVICES + '/empleados/' + empleado.id, empleado).pipe(
        catchError( e=> {
           if( e.status == 400 ){
             return throwError(e);
           }
          return throwError(e);
        })
      );
    }
  
    deleteEmpleado(id: number): Observable<Empleado>{
      return this.http.delete<Empleado>( environment.URL_SERVICES + '/empleados/' + id).pipe(
        catchError( e=> {
          return throwError(e);
        })
      );
    }
}
