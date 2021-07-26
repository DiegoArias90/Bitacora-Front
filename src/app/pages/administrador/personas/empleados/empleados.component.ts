import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../models/empleado';
import { EmpleadoService } from '../../../../services/services.index';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[];
  titulo: string = '';

  constructor(
    private empleadoService: EmpleadoService,
  ) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe( empleados=> {
      this.empleados = empleados;     
    });
  }


}
