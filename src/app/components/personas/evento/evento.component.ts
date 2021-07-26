import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../../../models/persona';
import { TipoEvento } from '../../../models/tipo-evento';
import { Evento } from '../../../models/evento';
import { ComponentesService, EventoService, PersonaService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {

  @Input() persona: Persona;
  tipoEventos: TipoEvento[];
  evento: Evento = new Evento();

  titulo: string = '';
  dialogEvento: boolean = false;
  minDate: Date;
  eventos: Evento[];
  maxDate: Date;
  private archivoSeleccionado: File;

  constructor(
    private eventoService: EventoService,
    private personaService: PersonaService,
    public componentesService: ComponentesService,
  ) { }

  ngOnInit(): void {
    this.getTipoEventos();
    this. getPersona();
  }

  getTipoEventos(){
    this.eventoService.getTipoEvento().subscribe( eventos => {
      this.tipoEventos = eventos;
    });
  }

  getPersona(){
    this.personaService.getPersona(this.persona.id).subscribe( persona => {
      this.persona = persona;
    })
  }

  getEvento( idEvento:number ){
    this.evento = new Evento();
    if(idEvento){
      this.eventoService.getEvento(idEvento).subscribe( evento => {
        if(evento){
          this.evento = evento;
        }        
      })
    }
  }

  cambiarFechaEvento(){
    this.evento.fechaFinalizacion = this.evento.fechaFinalizacion;
    this.evento.fechaCreacion = this.evento.fechaCreacion;
    this.evento.fechaFinalizacion = this.evento.fechaCreacion;
   }

   openDialogCrearEvento(): void {
    this.titulo = 'Registro Nuevo Evento';
    this.getEvento(null);
    this.dialogEvento = true;
  }

  openDialogEditarEvento( evento: Evento ): void {
    this.titulo = 'Actualizar Registro de Evento';
     this.getEvento(evento.id);
     this.dialogEvento = true;
   }

  crearEvento(){  
     let nuevoEvento = new Evento();
     nuevoEvento.responsable = (this.evento.responsable != null ? this.evento.responsable.toUpperCase().trim() : "");
     nuevoEvento.fechaCreacion = new Date(this.evento.fechaCreacion);
     nuevoEvento.fechaFinalizacion = new Date(this.evento.fechaFinalizacion);
     nuevoEvento.horaInicio = moment(this.evento.horaInicio).format('h:mm:ss');
     nuevoEvento.horaFinalizacion = moment(this.evento.horaFinalizacion).format('h:mm:ss');
     nuevoEvento.estado = this.evento.estado;
     nuevoEvento.detalle = (this.evento.detalle != null ? this.evento.detalle.toUpperCase().trim() : "");
     nuevoEvento.novedad = (this.evento.novedad != null ? this.evento.novedad.toUpperCase().trim() : "");
     nuevoEvento.persona = this.persona;
     nuevoEvento.tipoEvento = this.evento.tipoEvento;  
     nuevoEvento.listaInvitados = this.evento.listaInvitados; 
     console.log(nuevoEvento);
     
     this.eventoService.crearEvento(nuevoEvento).subscribe( resp => {
      if(nuevoEvento.listaInvitados){
        this.subirArchivo();
       }
      this.getPersona();
       this.dialogEvento = false;
       Swal.fire({
         icon: 'success',
         title: 'Se a creado con exito!',
         text: `${this.evento.tipoEvento.nombreEvento}`,
         showConfirmButton: true,
       });
     });
  }

  updateEvento(){
    try {
      this.eventoService.getEvento(this.evento.id).subscribe( eventoAux => {
        if( eventoAux != null ){
            eventoAux.responsable = (this.evento.responsable != null ? this.evento.responsable.toUpperCase().trim() : null);
            eventoAux.fechaCreacion = new Date(this.evento.fechaCreacion);
            eventoAux.fechaFinalizacion = new Date(this.evento.fechaFinalizacion);
            // eventoAux.horaInicio =  moment(this.evento.horaInicio).format('h:mm:ss');
            // eventoAux.horaFinalizacion = this.evento.horaFinalizacion
            eventoAux.estado = this.evento.estado;
            eventoAux.detalle = (this.evento.detalle != null ? this.evento.detalle.toUpperCase().trim() : null);
            eventoAux.novedad = (this.evento.novedad != null ? this.evento.novedad.toUpperCase().trim() : null );
            eventoAux.tipoEvento = this.evento.tipoEvento;
            this.eventoService.updateEvento(eventoAux).subscribe( evento => {
              console.log(evento);
              
              if(evento){
                Swal.fire({
                  icon: 'success',
                  title: 'Datos actualizado con Exito!',
                  text: `${this.evento.tipoEvento.nombreEvento}`,
                  showConfirmButton: true,
                });
                this.dialogEvento = false;
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

  deleteEvento(evento: Evento){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminara el evento!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventoService.deleteEvento(evento.id).subscribe( evento => {
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

  seleccionarArchivo(event){
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
    
  }

  subirArchivo(){
    this.eventoService.UploadListaInvitados(this.archivoSeleccionado, this.evento.id).subscribe( evento => {
      this.evento = evento;
      console.log(this.evento);
      
    })
  }

}
