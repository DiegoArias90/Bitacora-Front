import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService, ComponentesService } from '../../../../services/services.index';
import {Table} from 'primeng/table';
import Swal from 'sweetalert2';
import { TipoPersona } from 'src/app/models/tipo-persona';
import { Empresa } from '../../../../models/empresa';
import { AuthService } from '../../../../auth/auth.service';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit, OnDestroy {

  @ViewChild('dt') table: Table;

  titulo: string = "";
  personas: Persona[];
  personasHabilitadas: Persona[];
  personasDeshabilitadas: Persona[];
  habilitaBoton: boolean = false;


  tipoPersonas: TipoPersona[];
  empresas: Empresa[];


  selectedDrop: TipoPersona;
  selectedPersonas: Persona[];
  persona: Persona = new Persona();
  personaTipo: boolean = false;
  personaSeleccionada: Persona;
  dialogPersona: boolean = false;


  dialogPersonaEmpleado: boolean = false;
  loading: boolean = false;


  constructor(
    private personaService: PersonaService,
    private componentesService: ComponentesService,
  ) { }


  ngOnDestroy(): void {
    this.getTipoPersona();
    this.getPersonas();
    this.getEmpresaPersona();
    this.openDialogCrearPersona();
  }

  ngOnInit(): void {
    this.getPersonas();
    this.getTipoPersona();
    this.getEmpresaPersona();
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

   personaNatural(event){
     let tipo = event.value.nombre;
    if( tipo === 'Juridica') {
      this.personaTipo = true;
    } else {
      this.personaTipo = false
    }
    return this.personaTipo;
   }


  getPersonas(){
    this.loading = true;
    this.personaService.getPersonasByEmpresa().subscribe( persona => {
      this.personas = persona;      
      this.loading = false;     
    });
  }

  getTipoPersona(){
    this.personaService.getTipoPersona().subscribe( resp => {
      this.tipoPersonas = resp;
    });
  }

  getEmpresaPersona(){
    this.personaService.getEmpresaPersona().subscribe( empresas => {
      this.empresas = empresas;     
    });
  }

  getPersona( idPersona:number ){
    this.persona = new Persona();
    if(idPersona){
      this.personaService.getPersona(idPersona).subscribe( persona => {
        if(persona){
          this.loading = false ;
          this.persona = persona;
        }        
      })
    }
  }

  crearPersona(){
    let nuevaPersona = new Persona();
    nuevaPersona.lote = this.persona.lote.toUpperCase().trim();
    nuevaPersona.cedula = this.persona.cedula.toUpperCase().trim();
    nuevaPersona.nombre = this.persona.nombre.toUpperCase().trim();
    nuevaPersona.apellido = this.persona.apellido.toUpperCase().trim();
    nuevaPersona.telefono = this.persona.telefono;
    nuevaPersona.antecedentes = this.persona.antecedentes.toUpperCase().trim();
    nuevaPersona.observacion = (this.persona.observacion != null ? this.persona.observacion.toUpperCase().trim() : null);
    nuevaPersona.estado = this.persona.estado = true;
    nuevaPersona.email = (this.persona.email != null ? this.persona.email : null);
    nuevaPersona.tipoPersona = this.persona.tipoPersona;
    nuevaPersona.empresa = this.persona.empresa; 
    console.log(nuevaPersona);
     this.personaService.crearPersona(nuevaPersona).subscribe( resp => {
       console.log(nuevaPersona);
       
       Swal.fire({
         icon: 'success',
         title: resp.msg,
         text: `${this.persona.nombre}`,
         showConfirmButton: true,
       });
       this.dialogPersona = false;
       this.getPersonas();
     }, err => {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incorrectos',
        text: err.error.errors[0],
        showConfirmButton: true,
      })
     });
  }

  updatePersona(){
    let dateActualiza = new Date();
    this.personaService.getPersona(this.persona.id).subscribe( personaAux => {
      if( personaAux != null ){
        personaAux.lote =  this.persona.lote = this.persona.lote.toUpperCase().trim();
        personaAux.cedula = this.persona.cedula.toUpperCase().trim();
        personaAux.nombre = this.persona.nombre.toUpperCase().trim();
        personaAux.telefono = this.persona.telefono;
        personaAux.antecedentes = this.persona.antecedentes.toUpperCase().trim();
        personaAux.observacion = (this.persona.observacion != null ? this.persona.observacion.toUpperCase().trim() : this.persona.observacion);
        personaAux.estado = this.persona.estado;
        personaAux.fechaActualizacion = dateActualiza;
        personaAux.email = this.persona.email;
        personaAux.tipoPersona = this.persona.tipoPersona;
        if( this.persona.tipoPersona.nombre.indexOf('Juridica')){
          personaAux.apellido = "";
        } else {
          personaAux.apellido = this.persona.apellido.toUpperCase().trim()
        }
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
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'La persona no se puedo acualizar!',
            showConfirmButton: true,
          });
        });
      
    }
    }, err =>{
      Swal.fire({
        icon: 'error',
        title: 'La persona no se puedo acualizar!',
        showConfirmButton: true,
      });
    });


    

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
            'Eliminado!',
            'La persona ha sido eliminada.',
            'success'
          )
        })  
      }
    })
  }
}
