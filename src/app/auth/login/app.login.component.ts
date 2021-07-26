import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.scss']
})
export class AppLoginComponent implements OnInit {
  
  @ViewChild('username') username: ElementRef;

  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  autenticado(){
    if(this.authService.isAuthenticated()){
      if(this.authService.hasRoles('ROLE_ADMIN') || (this.authService.hasRoles('ROLE_SUPER'))){
        this.router.navigate(['/dashboard/residentes']);
      } else {
        this.router.navigate(['/dashboard/bitacora']);
      }
    }
  }

  
  ngAfterViewInit(): void {
    this.username.nativeElement.focus();
  }

  login(): void{    
    if( this.usuario.username == null || this.usuario.password == null){
      Swal.fire({
        icon: 'error',
        title: 'Credenciales Incorrectas',
        text: 'Los campos no deben estar vacios',
        timer: 2500
      })
      return;
    }
    this.authService.login(this.usuario).subscribe( resp => {
      this.authService.guardarUsuario( resp.access_token );
      this.authService.guardarToken(resp.access_token);
      let usuario = this.authService.usuario;
      if(this.authService.hasRoles('ROLE_ADMIN') || (this.authService.hasRoles('ROLE_SUPER'))){
        this.router.navigate(['/dashboard/residentes']);
      } else {
        this.router.navigate(['/dashboard/bitacora']);
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: usuario.nombre,
        timer: 2000
      })
    }, err => {
      if( err.status == 400){
        Swal.fire({
          icon: 'error',
          title: 'Credenciales Incorrectas',
          text: 'Las credenciales son incorrectas, revice!',
          timer: 2500
        })
      }
    })
    
  }

}
