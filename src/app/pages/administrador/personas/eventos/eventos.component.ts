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


  descargarExcel(evento: Evento){
    const filename = evento.listaInvitado;   
      this.eventoService.downloadListaEvento(filename).subscribe( resp => {
        this.manageExcelFile( resp, filename );
      });
  }

  manageExcelFile( resp: any, filename: string ){
    const dataType = resp.type;
    const binaryData = [];

    binaryData.push(resp);
    const filePath = window.URL.createObjectURL( new Blob( binaryData, { type: dataType } ) )
    const downloadPah = document.createElement('a');
    downloadPah.href = filePath;
    downloadPah.setAttribute('download', filename);
    document.body.appendChild(downloadPah);
    downloadPah.click();
  }



 





}
