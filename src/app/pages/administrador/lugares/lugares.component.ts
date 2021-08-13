import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../models/empresa';

import Swal from 'sweetalert2';
import { LugarService } from 'src/app/services/services.index';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss']
})
export class LugaresComponent implements OnInit {

  empresas: Empresa[];
  empresa: Empresa = new Empresa();
  nuevaEmpresa: Empresa = new Empresa();
  selectedLugares: Empresa[];
  titulo: string ='';
  dialogLugar: boolean = false;

  statusLugar(estado){
    if(estado ===  true){
      return 'qualified'
    }
    return 'unqualified';
  }

  constructor(
    private lugarService: LugarService
  ) { }

  ngOnInit(): void {
    this.getEmpresas();
  }

  openDialogCrearLugar(): void {
    this.titulo = 'Registro Nuevo Empresa';
    this.getEmpresa(null);
    this.dialogLugar = true;
  }

  openDialogEditarLugar( empresa: Empresa ): void {
    this.titulo = 'Actualizar Registro de Empresa';
     this.getEmpresa(empresa.id);
     this.dialogLugar = true;
   }

  getEmpresas(){
    this.lugarService.getEmpresas().subscribe( empresas => {     
      this.empresas = empresas;                
    });
  }

  getEmpresa( idEmpresa:number ){
    this.empresa = new Empresa();
    if(idEmpresa){
      this.lugarService.getEmpresa(idEmpresa).subscribe( empresa => {
        if(empresa){         
          this.empresa = empresa;
          console.log(this.empresa);
        }        
      })
    }
  }

   crearEmpresa(){
     let nuevaEmpresa = new Empresa();
     nuevaEmpresa.nombre = (this.empresa.nombre != null ? this.empresa.nombre.toUpperCase().trim() : this.empresa.nombre);
     nuevaEmpresa.direccion = (this.empresa.direccion != null ? this.empresa.direccion.toUpperCase().trim() : this.empresa.direccion);
     nuevaEmpresa.telefono = this.empresa.telefono;
     nuevaEmpresa.email = this.empresa.email;
     nuevaEmpresa.estado = true;
     nuevaEmpresa.observacion = (this.empresa.observacion != null ? this.empresa.observacion.toUpperCase().trim() : this.empresa.observacion);
     this.lugarService.crearEmpresa(nuevaEmpresa).subscribe( resp => {
       Swal.fire({
         icon: 'success',
         title: resp.msg,
         text: `${this.empresa.nombre}`,
         showConfirmButton: true,
       })
       this.dialogLugar = false;
       this.getEmpresas();
     }, err => {
      Swal.fire({
        icon: 'warning',
        title: 'Error al crear la empresa',
        text: `${this.empresa.nombre}`,
        showConfirmButton: true,
      });
     });
   }

   updateUsuario(){
    this.lugarService.getEmpresa(this.empresa.id).subscribe( empresaAux => {
      if( empresaAux != null ){
        empresaAux.nombre = (this.empresa.nombre != null ? this.empresa.nombre.toUpperCase().trim() : this.empresa.nombre);
        empresaAux.direccion = (this.empresa.direccion != null ? this.empresa.direccion.toUpperCase().trim() : this.empresa.direccion);
        empresaAux.telefono = this.empresa.telefono;
        empresaAux.email = this.empresa.email != null ? this.empresa.email.toUpperCase().trim() : "";
        empresaAux.estado = this.empresa.estado;
        empresaAux.observacion = (this.empresa.observacion != null ? this.empresa.observacion.toUpperCase().trim() : this.empresa.observacion);
          this.lugarService.updateEmpresa(empresaAux).subscribe( empresa => {
            if(empresa){
              this.dialogLugar = false;
              this.getEmpresas();
              Swal.fire({
                icon: 'success',
                title: 'Usuario Actualizado con Exito!',
                text: `${this.empresa.nombre}`,
                showConfirmButton: true,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'El usuario no se puedo acualizar!',
                showConfirmButton: true,
              });
            }
          }, err => {
            Swal.fire({
              icon: 'error',
              title: 'El usuario no se puedo acualizar!',
              showConfirmButton: true,
            });
          });
     
      }

    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'El usuario no se puedo acualizar!',
        showConfirmButton: true,
      });
    });
   }

   deleteLugar(empresa: Empresa){
     Swal.fire({
       title: 'Estas seguro?',
       text: "Se eliminara esta empresa!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, eliminar!'
     }).then((result) => {
       if (result.isConfirmed) {
         this.lugarService.deleteEmpresa(empresa.id).subscribe( lugar => {
           this.getEmpresas();
           Swal.fire(
             'Eliminado!',
             'La empresa a sido eliminado.',
             'success'
           )
         })  
       }
     })
   }


  


}
