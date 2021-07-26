import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ComponentesService, VisitanteService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {

  vehiculoVisitante: Vehiculo[];
  vehiculoNuevo: Vehiculo = new Vehiculo();

  constructor(
    private visitanteService: VisitanteService,
    public componentesService: ComponentesService,
  ) { }

  ngOnInit(): void {
  }


  getVehiculoVisitantes(){
    this.visitanteService.getVehiculoVisitantes().subscribe( vehiculos => {
      this.vehiculoVisitante = vehiculos;     
    });
  }

  crearVehiculo(){
    let newVehiculo = new Vehiculo();
    newVehiculo.placa = (this.vehiculoNuevo.placa != null ? this.vehiculoNuevo.placa.toUpperCase().trim() : this.vehiculoNuevo.placa);
    newVehiculo.tipoVehiculo = this.vehiculoNuevo.tipoVehiculo.toUpperCase().trim();
    newVehiculo.marca = this.vehiculoNuevo.marca.toUpperCase().trim();
    newVehiculo.color = this.vehiculoNuevo.color.toUpperCase().trim();
    newVehiculo.modelo = this.vehiculoNuevo.modelo.toUpperCase().trim();
    newVehiculo.detalle = this.vehiculoNuevo.detalle.toUpperCase().trim(); 
        
    this.visitanteService.crearVehiculo(newVehiculo).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: resp.msg,
        text: `${this.vehiculoNuevo.placa}`,
        showConfirmButton: true,
      });
      this.getVehiculoVisitantes();
      this.componentesService.dialogCrearVehiculo = false;
    });
  }

}
