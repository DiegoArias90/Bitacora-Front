import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService, ComponentesService } from '../../../../services/services.index';
import {Table} from 'primeng/table';
import Swal from 'sweetalert2';
import { TipoPersona } from 'src/app/models/tipo-persona';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  @ViewChild('dt') table: Table;

  titulo: string = "";
  personas: Persona[];
  tipoPersonas: TipoPersona[];
  selectedDrop: TipoPersona;
  selectedPersonas: Persona[];
  persona: Persona = new Persona();
  personaSeleccionada: Persona;
  dialogPersona: boolean = false;

  dialogPersonaEmpleado: boolean = false;
  //private errores: string[];


  constructor(
    private personaService: PersonaService,
    private componentesService: ComponentesService 
  ) { }

  ngOnInit(): void {
    this.getPersonas();
    this.getTipoPersona();
  }

  openDialog() {
    this.dialogPersona = true;
  }

  openDialogEmpleado( persona: Persona) {
    this.personaSeleccionada = persona;
    this.componentesService.openDialogEmpleado();
  }
  openDialogEvento( persona: Persona) {
    this.personaSeleccionada = persona;
    this.componentesService.openDialogEvento();
  }

  openDialogVehiculo( persona: Persona) {
    this.personaSeleccionada = persona;
    this.componentesService.openDialogVehiculo();
  }

  openDialogCrearPersona(): void {
    this.titulo = 'Registro Nueva Persona';
    this.getPersona(null);
    this.dialogPersona = true;
  }

  openDialogEditarPersona( persona: Persona ): void {
    this.titulo = 'Actualizar Registro de Persona';
     this.getPersona(persona.id);
     this.dialogPersona = true;
   }

  getPersonas(){
    this.personaService.getPersonas().subscribe( persona => {
      this.personas = persona;      
    });
  }

  getTipoPersona(){
    this.personaService.getTipoPersona().subscribe( resp => {
      this.tipoPersonas = resp;
    });
  }

  getPersona( idPersona:number ){
    this.persona = new Persona();
    if(idPersona){
      this.personaService.getPersona(idPersona).subscribe( persona => {
        if(persona){
          this.persona = persona;
        }        
      })
    }
  }

  crearPersona(){
    let nuevaPersona = new Persona();
    nuevaPersona.lote = this.persona.lote.toUpperCase().trim();
    nuevaPersona.razonSocial = (this.persona.razonSocial != null ? this.persona.razonSocial.toUpperCase().trim() : this.persona.razonSocial);
    nuevaPersona.cedula = this.persona.cedula.toUpperCase().trim();
    nuevaPersona.nombre = this.persona.nombre.toUpperCase().trim();
    nuevaPersona.apellido = this.persona.apellido.toUpperCase().trim();
    nuevaPersona.telefono = this.persona.telefono;
    nuevaPersona.antecedentes = this.persona.antecedentes.toUpperCase().trim();
    nuevaPersona.observacion = (this.persona.observacion != null ? this.persona.observacion.toUpperCase().trim() : this.persona.observacion);
    nuevaPersona.estado = this.persona.estado = true;
    nuevaPersona.email = this.persona.email;
    nuevaPersona.tipoPersona = this.persona.tipoPersona;
    console.log(nuevaPersona.tipoPersona);
    
    this.personaService.crearPersona(nuevaPersona).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: resp.msg,
        text: `${this.persona.nombre}`,
        showConfirmButton: true,
      })
      this.dialogPersona = false;
      this.getPersonas();
    });
  }

  updatePersona(){
    let dateActualiza = new Date();
    try {
      this.personaService.getPersona(this.persona.id).subscribe( personaAux => {
        if( personaAux != null ){
            personaAux.lote =  this.persona.lote = this.persona.lote.toUpperCase().trim();
            personaAux.razonSocial = (this.persona.razonSocial != null ? this.persona.razonSocial.toUpperCase().trim() : this.persona.razonSocial);
            personaAux.cedula = this.persona.cedula.toUpperCase().trim();
            personaAux.nombre = this.persona.nombre.toUpperCase().trim();
            personaAux.apellido = this.persona.apellido.toUpperCase().trim();
            personaAux.telefono = this.persona.telefono;
            personaAux.antecedentes = this.persona.antecedentes.toUpperCase().trim();
            personaAux.observacion = (this.persona.observacion != null ? this.persona.observacion.toUpperCase().trim() : this.persona.observacion);
            personaAux.estado = this.persona.estado;
            personaAux.fechaActualizacion = dateActualiza;
            personaAux.email = this.persona.email;
            personaAux.tipoPersona = this.persona.tipoPersona;
            this.personaService.updatePersona(personaAux).subscribe( persona => {
              if(persona){
                this.dialogPersona = false;
                Swal.fire({
                  icon: 'success',
                  title: 'Persona Actualizado con Exito!',
                  text: `${this.persona.nombre}`,
                  showConfirmButton: true,
                });
                this.getPersonas();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'La persona no se puedo acualizar!',
                  showConfirmButton: true,
                });
              }
            })
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'La persona no se puedo acualizar!',
            showConfirmButton: true,
          });
        }
      });
     } catch (error) {
       Swal.fire({
         icon: 'error',
         title: 'El Persona no pudo ser actualizado!',
         text: `${this.persona.nombre}`,
         showConfirmButton: true,
        })
     }
  }

  deletePersona(persona: Persona){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminara la persona!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.deletePersona(persona.id).subscribe( persona => {
          this.getPersonas();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })  
      }
    })
  }
}
