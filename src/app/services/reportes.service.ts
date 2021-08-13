import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  //private httpHeaders = new HttpHeaders({ 'responseType': 'blob' });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getReporteGeneral(): Observable<Blob> {

    let empresaId = parseInt(this.authService.empresaId);
       
    return this.http.post(`${environment.URL_SERVICES}/reporteGeneral`, 
        {
          fechaInicio: '2021-01-01',
          fechaFin: '2021-12-01',
          empresaId: empresaId
        }, 
        { responseType: 'blob' }
        )
  }

  getReportePropietario(): Observable<Blob> {
    return this.http.get(`${environment.URL_SERVICES}/reportePropietario`, { responseType: 'blob' })
  }

  getReporteVehiculo(): Observable<Blob> {
    return this.http.get(`${environment.URL_SERVICES}/reporteVehiculo`, { responseType: 'blob' })
  }

  
}
