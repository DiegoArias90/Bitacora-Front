import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { VehiculoP } from 'src/app/models/vehiculoP';

import { ComponentesService, PersonaService, VehiculoService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {

  @Input() persona: Persona;

  titulo: string = '';
  vehiculo: VehiculoP = new VehiculoP();
  dialogVehiculoPropietario: boolean = false;

  constructor(
    private personaService: PersonaService,
    public componentesService: ComponentesService,
    private vehiculoService: VehiculoService
  ) { }

  ngOnInit(): void {
    this.getPersona();
  }

  getPersona(){
    this.personaService.getPersona(this.persona.id).subscribe( persona => {
      this.persona = persona;
    })
  }

  getVehiculo( idVehiculo:number ){
    this.vehiculo = new VehiculoP();
    if(idVehiculo){
      this.vehiculoService.getVehiculo(idVehiculo).subscribe( vehiculo => {
        if(vehiculo){
          this.vehiculo = vehiculo;
        }        
      })
    }
  }

  openDialogCrearVehiculo(): void {
    this.titulo = 'Registro Nuevo Vehiculo';
    this.getVehiculo(null);
    this.dialogVehiculoPropietario = true;
  }

  openDialogEditarVehiculo( vehiculo: VehiculoP ): void {
    this.titulo = 'Actualizar Registro de Vehiculo';
     this.getVehiculo(vehiculo.id);
     this.dialogVehiculoPropietario = true;
   }

   crearVehiculo(){
    let nuevoVehiculo = new VehiculoP();
    nuevoVehiculo.placa = (this.vehiculo.placa != null ? this.vehiculo.placa.toUpperCase().trim() : this.vehiculo.placa);
    nuevoVehiculo.modelo = (this.vehiculo.modelo != null ? this.vehiculo.modelo.toUpperCase().trim() : this.vehiculo.modelo);
    nuevoVehiculo.marca = (this.vehiculo.marca != null ? this.vehiculo.marca.toUpperCase().trim() : this.vehiculo.marca);
    nuevoVehiculo.anioAuto = (this.vehiculo.anioAuto != null ? this.vehiculo.anioAuto.toUpperCase().trim() : this.vehiculo.anioAuto);
    nuevoVehiculo.color = (this.vehiculo.color != null ? this.vehiculo.color.toUpperCase().trim() : this.vehiculo.color);
    nuevoVehiculo.persona = this.persona;
    nuevoVehiculo.tipoVehiculo = (this.vehiculo.tipoVehiculo != null ? this.vehiculo.tipoVehiculo.toUpperCase().trim() : this.vehiculo.tipoVehiculo);
    this.vehiculoService.crearVehiculo(nuevoVehiculo).subscribe( resp => {
      this.getPersona();
      this.dialogVehiculoPropietario = false;
      Swal.fire({
        icon: 'success',
        title: 'Se a creado con exito!',
        text: `${this.vehiculo.placa}`,
        showConfirmButton: true,
      });
      
    });
  }

  updateVehiculo(){
    try {
      this.vehiculoService.getVehiculo(this.vehiculo.id).subscribe( vehiculoAux => {
        if( vehiculoAux != null ){
            vehiculoAux.placa =  (this.vehiculo.placa != null ? this.vehiculo.placa.toUpperCase().trim() : this.vehiculo.placa);
            vehiculoAux.modelo = (this.vehiculo.modelo != null ? this.vehiculo.modelo.toUpperCase().trim() : this.vehiculo.modelo);
            vehiculoAux.marca = (this.vehiculo.marca != null ? this.vehiculo.marca.toUpperCase().trim() : this.vehiculo.marca);
            vehiculoAux.anioAuto = (this.vehiculo.anioAuto != null ? this.vehiculo.anioAuto.toUpperCase().trim() : this.vehiculo.anioAuto);
            vehiculoAux.color = (this.vehiculo.color != null ? this.vehiculo.color.toUpperCase().trim() : this.vehiculo.color);
            vehiculoAux.tipoVehiculo = (this.vehiculo.tipoVehiculo != null ? this.vehiculo.tipoVehiculo.toUpperCase().trim() : this.vehiculo.tipoVehiculo);
            this.vehiculoService.updateVehiculo(vehiculoAux).subscribe( vehiculo => {
              if(vehiculo){
                this.dialogVehiculoPropietario = false;
                Swal.fire({
                  icon: 'success',
                  title: 'Datos actualizado con Exito!',
                  text: `${this.vehiculo.placa}`,
                  showConfirmButton: true,
                });
                this.getPersona();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'No se puedo acualizar!',
                  showConfirmButton: true,
                });
              }
            })
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se puedo acualizar!',
            showConfirmButton: true,
          });
        }
      });
     } catch (error) {
       Swal.fire({
         icon: 'error',
         title: 'No pudo ser actualizado!',
         text: `${this.persona.nombre}`,
         showConfirmButton: true,
        })
     }
  }

  deleteVehiculo(vehiculo: VehiculoP){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminara el vehiculo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.deleteVehiculo(vehiculo.id).subscribe( vehiculo => {
          this.getPersona();
          Swal.fire(
            'Eliminado!',
            'Se elimino con exito.',
            'success'
          )
        })  
      }
    })
  }


}
