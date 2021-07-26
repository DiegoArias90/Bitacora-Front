import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Evento } from '../models/evento';
import { TipoEvento } from '../models/tipo-evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor( 
    private http: HttpClient,
    private router: Router, ) { }

    getTipoEvento():Observable<TipoEvento[]>{
      return this.http.get<TipoEvento[]>( environment.URL_SERVICES + '/eventos/tiposEventos');
    }


    getEventos():Observable<Evento[]>{
      return this.http.get<Evento[]>( environment.URL_SERVICES + '/eventos');
    }

    getEvento(id: number): Observable<Evento>{
      return this.http.get<Evento>( environment.URL_SERVICES + '/eventos/' + id).pipe(
        catchError( e => {
          if( e.status != 401 ){
            this.router.navigate(['/dashboard/eventos']);
          }
          return throwError(e);
        })
      );
    }

    crearEvento(evento: Evento): Observable<any>{
      return this.http.post<any>( environment.URL_SERVICES + '/eventos', evento).pipe(
        catchError( e=> {
           if( e.status == 400 ){
             return throwError(e);
           }
          return throwError(e);
        })
      );
    }


    updateEvento(evento: Evento): Observable<Evento>{
      return this.http.put<Evento>( environment.URL_SERVICES + '/eventos/' + evento.id, evento).pipe(
        catchError( e=> {
           if( e.status == 400 ){
             return throwError(e);
           }
          return throwError(e);
        })
      );
    }

    UploadListaInvitados( archivo: File, id ){
      let formData = new FormData();
      formData.append("archivo" , archivo);
      formData.append("id", id);
      return this.http.post( environment.URL_SERVICES + '/eventos/upload', formData ).pipe(
        map( (resp: any) => resp.evento as Evento  ),
        catchError(e=> {
          if( e.status == 400 ){
            return throwError(e);
          }
         return throwError(e);
       })
      ) 
    }
  
    deleteEvento(id: number): Observable<Evento>{
      return this.http.delete<Evento>( environment.URL_SERVICES + '/eventos/' + id).pipe(
        catchError( e=> {
          return throwError(e);
        })
      );
    }
}
