import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Role } from '../../../models/role';
import { UsuarioService } from '../../../services/services.index';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/auth.service';
import { Empresa } from '../../../models/empresa';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  selectedUsuarios: Usuario[];
  selectedDrop: Role;
  selectedDropEmpresa: Empresa;
  usuarios: Usuario[];
  usuariosHabilitados: Usuario[];
  usuariosDeshabilitados: Usuario[];
  usuario: Usuario = new Usuario();
  usuarioPass: Usuario = new Usuario();

  //Multiselects
  roles: Role[];
  perfiles: any[];
  empresas: Empresa[];
  lugares: any[];
  

  titulo: string = ""; 
  dialogUsuario: boolean = false;
  dialogCambioPassword: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.getRoles();

    this.getEmpresas();
  }

  openDialogCrearUsuario(): void {
    this.titulo = 'Registro Nueva Usuario';
    this.getUsuario(null);
    this.dialogUsuario = true;
  }

  openDialogEditarUsuario( usuario: Usuario ): void {
    this.titulo = 'Actualizar Registro de Usuario';
     this.getUsuario(usuario.id);
     this.dialogUsuario = true;
   }

   openDialogActualizarPassword( usuario: Usuario ): void {
    this.titulo = 'Actualizar Contaseña de Usuario';
     this.getUsuario(usuario.id);
     this.dialogCambioPassword = true;
   }

   getRoles(){
    this.usuarioService.getRoles().subscribe( roles => {
      this.roles = roles;
      this.perfiles = roles;
    });
  }

  getEmpresas(){
    this.usuarioService.getEmpresas().subscribe( empresas => {
      this.empresas = empresas;
      this.lugares = empresas;
    });
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe( usuarios => {
      this.usuarios = usuarios;               
    });
  }

  getUsuario( idUsuario:number ){
    this.usuario = new Usuario();
    if(idUsuario){
      this.usuarioService.getUsuario(idUsuario).subscribe( usuario => {
        if(usuario){
          this.usuario = usuario;
        }        
      })
    }
  }

  crearUsuario(){
    let nuevaUsuario = new Usuario();
    nuevaUsuario.cedula = this.usuario.cedula.toUpperCase().trim();
    nuevaUsuario.username = this.usuario.username.trim();
    nuevaUsuario.nombre = (this.usuario.nombre != null ? this.usuario.nombre.toUpperCase().trim() : this.usuario.nombre);
    nuevaUsuario.apellido = this.usuario.apellido.toUpperCase().trim();
    nuevaUsuario.telefono = (this.usuario.telefono != null ? this.usuario.telefono.toUpperCase().trim() : this.usuario.telefono);
    nuevaUsuario.observacion = (this.usuario.observacion != null ? this.usuario.observacion.toUpperCase().trim() : this.usuario.observacion);
    nuevaUsuario.estado = this.usuario.estado = false;
    nuevaUsuario.password = this.usuario.password;
    nuevaUsuario.roles = this.usuario.roles;  
    nuevaUsuario.empresas = this.usuario.empresas;  
    this.usuarioService.crearUsuario(nuevaUsuario).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: resp.msg,
        text: `${this.usuario.nombre}`,
        showConfirmButton: true,
      })
      this.dialogUsuario = false;
      this.getUsuarios();
    }, err => {
      console.log(err);
      
    });
  }

  updateUsuario(){
    try {
      this.usuarioService.getUsuario(this.usuario.id).subscribe( usuarioAux => {
        if( usuarioAux != null ){
            usuarioAux.cedula =  this.usuario.cedula = this.usuario.cedula.toUpperCase().trim();
            usuarioAux.nombre = this.usuario.nombre.toUpperCase().trim();
            usuarioAux.username = this.usuario.username.trim();
            usuarioAux.apellido = this.usuario.apellido.toUpperCase().trim();
            usuarioAux.telefono = this.usuario.telefono;
            usuarioAux.observacion = (this.usuario.observacion != null ? this.usuario.observacion.toUpperCase().trim() : this.usuario.observacion);
            usuarioAux.estado = this.usuario.estado;
            usuarioAux.roles = this.usuario.roles;
            usuarioAux.empresas = this.usuario.empresas;
            this.usuarioService.updateUsuario(usuarioAux).subscribe( usuario => {
              if(usuario){
                this.dialogUsuario = false;
                this.getUsuarios();

                Swal.fire({
                  icon: 'success',
                  title: 'Usuario Actualizado con Exito!',
                  text: `${this.usuario.nombre}`,
                  showConfirmButton: true,
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'El usuario no se puedo acualizar!',
                  showConfirmButton: true,
                });
              }
            })
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'El usuario no se puedo acualizar!',
            showConfirmButton: true,
          });
        }
      });
     } catch (error) {
       Swal.fire({
         icon: 'error',
         title: 'El usuario no pudo ser actualizado!',
         text: `${this.usuario.nombre}`,
         showConfirmButton: true,
        })
     }
  }

  cambiarRole( usuario: Usuario ){
    this.usuarioService.updateUsuario(usuario).subscribe( usuario => {
      console.log(usuario);
    })
    
  }

  cambiarPass( usuario: Usuario ){
    this.usuarioService.getUsuario(this.usuario.id).subscribe( usuarioAux => {
      if( usuarioAux != null ){
          usuarioAux.password = this.usuarioPass.password;
          console.log(usuarioAux);
          this.usuarioService.updateUsuario(usuarioAux).subscribe( usuario => {
              this.dialogCambioPassword = false;
              Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada con Exito!',
                text: `${this.usuario.nombre}`,
                showConfirmButton: true,
              });
           });
      }
    });
    
  }

  cambiarEmpresa( usuario: Usuario ){
    this.usuarioService.updateUsuario(usuario).subscribe( usuario => {
      this.dialogUsuario = false;
      Swal.fire({
        icon: 'success',
        title: 'Usuario Actualizado con Exito!',
        text: `${this.usuario.nombre}`,
        showConfirmButton: true,
      });
    })
    
  }

  deleteUsuario(usuario: Usuario){
    if( usuario.id === this.authService.usuario.id ){
      return Swal.fire({
        icon: 'error',
        title: 'No se puede borrar a si mismo',
        showConfirmButton: true,
      });
    }
    
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminara este usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(usuario.id).subscribe( usuario => {
          this.getUsuarios();
          Swal.fire(
            'Eliminado!',
            'El usuario a sido eliminado.',
            'success'
          )
        })  
      }
    })
  }

}
