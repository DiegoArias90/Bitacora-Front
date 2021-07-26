import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../../../models/persona';
import { Empleado } from '../../../models/empleado';
import { ComponentesService, EmpleadoService, PersonaService } from 'src/app/services/services.index';
import { TipoEmpleo } from '../../../models/tipo-empleo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  @Input() persona: Persona;

  empleados: Empleado[];
  empleado: Empleado = new Empleado();
  tipoEmpleos: TipoEmpleo[];
  titulo: string = "";

  dialogEmpleado: boolean = false;


  constructor(
    public componentesService: ComponentesService,
    private empleadoService: EmpleadoService,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.getTipoEmpleos();
    this.getPersona();
  }

  getTipoEmpleos(){
    this.empleadoService.getTipoEmpleos().subscribe( empleos => {
      this.tipoEmpleos = empleos;
    });
  }

  getPersona(){
    this.personaService.getPersona(this.persona.id).subscribe( persona => {
      this.persona = persona;
    })
  }

  getEmpleado( idEmpleado:number ){
    this.empleado = new Empleado();
    if(idEmpleado){
      this.empleadoService.getEmpleado(idEmpleado).subscribe( empleado => {
        if(empleado){
          this.empleado = empleado;
        }        
      })
    }
  }

  openDialogCrearEmpleado(): void {
    this.titulo = 'Registro Nuevo Empleado';
    this.getEmpleado(null);
    this.dialogEmpleado = true;
  }

  openDialogEditarEmpleado( empleado: Empleado ): void {
    this.titulo = 'Actualizar Registro de Empleado';
     this.getEmpleado(empleado.id);
     this.dialogEmpleado = true;
   }

   crearEmpleado(){
    let nuevaEmpleado = new Empleado();
    nuevaEmpleado.cedula = this.empleado.cedula;
    nuevaEmpleado.nombre = this.empleado.nombre.toUpperCase().trim();
    nuevaEmpleado.apellido = this.empleado.apellido.toUpperCase().trim();
    nuevaEmpleado.observacion = (this.empleado.observacion != null ? this.empleado.observacion.toUpperCase().trim() : this.empleado.observacion);
    nuevaEmpleado.persona = this.persona;
    nuevaEmpleado.tipoEmpleo = this.empleado.tipoEmpleo;
    this.empleadoService.crearEmpleado(nuevaEmpleado).subscribe( resp => {
      this.getPersona();
      this.dialogEmpleado = false;
      Swal.fire({
        icon: 'success',
        title: 'Se a creado con exito!',
        text: `${this.empleado.nombre}`,
        showConfirmButton: true,
      });
      
    });
  }

  updateEmpleado(){
    let dateActualiza = new Date();
    try {
      this.empleadoService.getEmpleado(this.empleado.id).subscribe( empleadoAux => {
        if( empleadoAux != null ){
            empleadoAux.cedula =  this.empleado.cedula.trim();
            empleadoAux.nombre = (this.empleado.nombre != null ? this.empleado.nombre.toUpperCase().trim() : this.empleado.nombre);
            empleadoAux.apellido = this.empleado.apellido.toUpperCase().trim();
            empleadoAux.observacion = (this.empleado.observacion != null ? this.empleado.observacion.toUpperCase().trim() : this.empleado.observacion);
            empleadoAux.estado = this.empleado.estado;
            empleadoAux.fechaActualizacion = dateActualiza;
            empleadoAux.tipoEmpleo = this.empleado.tipoEmpleo;
            this.empleadoService.updateEmpleado(empleadoAux).subscribe( empleado => {
              if(empleado){
                this.dialogEmpleado = false;
                Swal.fire({
                  icon: 'success',
                  title: 'Datos actualizado con Exito!',
                  text: `${this.empleado.nombre}`,
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

  deleteEmpleado(empleado: Empleado){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminara el empleado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.deleteEmpleado(empleado.id).subscribe( empleado => {
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
