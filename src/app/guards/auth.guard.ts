import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if( this.authService.isAuthenticated() ){
        if( this.isTokenExpired() ){
          this.authService.logout();
          Swal.fire({
            icon: 'error',
            title: 'Sesión Expirada',
            text: 'Inicie sesión!',
            showConfirmButton: true,
          });
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
  }

  isTokenExpired(){
    let token = this.authService.token;
    let payload = this.authService.obtenerInfoToken(token);
    let now = new Date().getTime() / 1000;

    if( payload.exp < now ){
      return true;
    }
    return false;
  }
  
}
