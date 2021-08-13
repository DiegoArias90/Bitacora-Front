import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Empresa } from '../../models/empresa';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.scss']
})
export class AppLoginComponent implements OnInit {
  
  @ViewChild('username') username: ElementRef;

  empresas: Empresa[];
  lugares: any[];
  selectedDropEmpresa: Empresa = null;
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  this.getEmpresas();
  }

   seleccionEmpresa(event) {
     this.selectedDropEmpresa = event.value;
   }

   getEmpresas(){
     this.usuarioService.getEmpresas().subscribe( empresas => {
       this.empresas = empresas;
      // console.log( this.empresas);
     });
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

    if( this.usuario.username == null || this.usuario.password == null || this.selectedDropEmpresa == null ){
      Swal.fire({
        icon: 'error',
        title: 'Credenciales Incorrectas',
        text: 'Los campos no deben estar vacios',
      });
      return;
    } else {

      this.authService.login(this.usuario).subscribe( resp => {
        this.usuarioService.getUsuario(resp.id).subscribe( user => {
          let tieneEmpresa =  user.empresas.find(obj => obj.nombre === this.selectedDropEmpresa.nombre);
            if(tieneEmpresa == undefined){
              Swal.fire({
                icon: 'error',
                title: 'Usuario no tiene permiso a la empresa seleccionada',
                text: 'Comunuquese con el administrador!',
              });
            } else {
               this.authService.guardarUsuario( resp.access_token );
               this.authService.guardarToken(resp.access_token);
               this.authService.guardarEmpresa(tieneEmpresa.id )
               this.authService.guardarEmpresaT(tieneEmpresa);
               let usuario = this.authService.usuario;
                 if(this.authService.hasRoles('ROLE_ADMIN') || (this.authService.hasRoles('ROLE_SUPER'))){
                   this.router.navigate(['/dashboard/usuarios']);
                 } else {
                   this.router.navigate(['/dashboard/bitacora']);
                 }
      
                  Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',
                    text: usuario.nombre,
                    timer: 2000
                  });
         }

        }, err => {
            console.log(err);

        });

      }, err => {

        switch (err.error.error_description) {
          case 'User is disabled':
            Swal.fire({
              icon: 'error',
              title: 'Usuario inactivo',
              text: 'Comunuquese con el administrador!',
            });
            break;
            case ' Bad credentials':
            Swal.fire({
              icon: 'error',
              title: 'Credenciales incorrectas',
              text: 'Intente nuevamente!',
            });
            
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Comuniquese con el administrador!',
            });
            break;
        }   
      });

    }

    // this.authService.login(this.usuario).subscribe( resp => {
    //    this.usuarioService.getUsuario(resp.id).subscribe( user => {
    //      let tieneEmpresa =  user.empresas.find(obj => obj.nombre === this.selectedDropEmpresa.nombre);
    //      if(tieneEmpresa == undefined){
    //        Swal.fire({
    //          icon: 'error',
    //          title: 'Usuario no tiene permiso a la empresa seleccionada',
    //          text: 'Comunuquese con el administrador!',
    //        });
    //        return;
    //      } else {
    //            this.authService.guardarUsuario( resp.access_token );
    //            this.authService.guardarToken(resp.access_token);
    //            this.authService.guardarEmpresa(tieneEmpresa.id )
    //            let usuario = this.authService.usuario;
    //              if(this.authService.hasRoles('ROLE_ADMIN') || (this.authService.hasRoles('ROLE_SUPER'))){
    //                this.router.navigate(['/dashboard/residentes']);
    //              } else {
    //                this.router.navigate(['/dashboard/bitacora']);
    //              }
      
    //    Swal.fire({
    //      icon: 'success',
    //     title: 'Bienvenido',
    //      text: usuario.nombre,
    //      timer: 2000
    //    })
    //      }
        
    //    });
     

      
    // }, err => {
    //   console.log(err);
      
    //   if( err.error.error_description === 'User is disabled'){
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Usuario inactivo',
    //       text: 'Comunuquese con el administrador!',
    //     });
        
        
    //   }
    //   if( err.error.error_description === ' Bad credentials'){
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Credenciales incorrectas',
    //       text: 'Intente nuevamente!',
    //     });
        
        
    //   }     
    // });
    
  }

}
