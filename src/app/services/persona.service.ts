import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { Persona } from '../models/persona';
import { TipoPersona } from '../models/tipo-persona';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Empresa } from '../models/empresa';
 
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService:AuthService
  ) { }
 

  getTipoPersona():Observable<TipoPersona[]>{
    return this.http.get<TipoPersona[]>( environment.URL_SERVICES + '/personas/tiposPersonas');
  }

  getEmpresaPersona():Observable<Empresa[]>{
    return this.http.get<Empresa[]>( environment.URL_SERVICES + '/personas/empresas');
  }

   getPersonas():Observable<Persona[]>{
     return this.http.get<Persona[]>( environment.URL_SERVICES + '/personas');
   }

   getPersonasByEmpresa():Observable<Persona[]>{
    let empresaId = parseInt(this.authService.empresaId);
    return this.http.get<Persona[]>( environment.URL_SERVICES + `/personas/byEmpresa/${empresaId}`);
  }

  // getPersonasHabilitadas():Observable<Persona[]>{
  //   return this.http.get<Persona[]>( environment.URL_SERVICES + '/personas-habilitadas');
  // }

  // getPersonasDeshabilitadas():Observable<Persona[]>{
  //   return this.http.get<Persona[]>( environment.URL_SERVICES + '/personas-deshabilitadas');
  // }


  crearPersona(persona: Persona): Observable<any>{
    return this.http.post<any>( environment.URL_SERVICES + '/personas', persona).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }

  getPersona(id: number): Observable<Persona>{
    return this.http.get<Persona>( environment.URL_SERVICES + '/personas/' + id).pipe(
      catchError( e => {
        if( e.status != 401 ){
          this.router.navigate(['/dashboard/residentes']);
        }
        return throwError(e);
      })
    );
  }

  

  updatePersona(persona: Persona): Observable<Persona>{
    return this.http.put<Persona>( environment.URL_SERVICES + '/personas/' + persona.id, persona).pipe(
      catchError( e=> {
         if( e.status == 400 ){
           return throwError(e);
         }
        return throwError(e);
      })
    );
  }

  deletePersona(id: number): Observable<Persona>{
    return this.http.delete<Persona>( environment.URL_SERVICES + '/personas/' + id).pipe(
      catchError( e=> {
        return throwError(e);
      })
    );
  }
}
