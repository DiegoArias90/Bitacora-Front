import { Component, OnInit } from '@angular/core';
import { TipoEvento } from '../../../../models/tipo-evento';
import { Persona } from '../../../../models/persona';
import { Evento } from '../../../../models/evento';
import { PersonaService, EventoService } from 'src/app/services/services.index';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos: Evento[];
  titulo: string = '';

  constructor(
    private eventoService: EventoService,
  ) {

   }

  ngOnInit(): void {
    this.getEventos();

  }

  getEventos(){
    this.eventoService.getEventos().subscribe( eventos => {
      this.eventos = eventos; 
    })
  }



 





}
