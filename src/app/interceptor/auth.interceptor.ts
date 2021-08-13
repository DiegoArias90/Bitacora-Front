import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
    return next.handle(req).pipe(
      catchError( e => {

        if( e.status == 401 ){
           if( this.authService.isAuthenticated() ){
             Swal.fire({
               icon: 'error',
               title: 'Acceso no autorizado',
               showConfirmButton: true,
             })
             this.authService.logout();
           }
           this.router.navigate(['/login']);
         }
         if( e.status == 403 ){
           Swal.fire({
             icon: 'error',
             title: 'Acceso restingido',
             text: 'El usuario no tiene el perfil requerido',
             showConfirmButton: true,
           })
           this.router.navigate(['/login']);
         }
        return throwError(e);
      })
    )
  }


}
