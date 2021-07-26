import { Component, OnInit, Output,  EventEmitter  } from '@angular/core';
import { Visitante } from 'src/app/models/visitante';
import { ComponentesService, VisitanteService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.scss']
})
export class VisitanteComponent implements OnInit {

  @Output() addVisitante: EventEmitter<Visitante[]> = new EventEmitter; 
  
  visitantes: Visitante[];
  visitanteNuevo: Visitante = new Visitante();



  constructor(
    private visitanteService: VisitanteService,
    public componentesService: ComponentesService,
  ) {
    
   }

  ngOnInit(): void {
    
  }

  getVisitantes(){
    this.visitanteService.getVisitantes().subscribe( visitantes => {
      this.visitantes = visitantes;  
    });
    //return this.visitantes;
  }

  crearVisitante(){
    let newVisitante = new Visitante();
    newVisitante.cedula = (this.visitanteNuevo.cedula != null ? this.visitanteNuevo.cedula.toUpperCase().trim() : this.visitanteNuevo.cedula);
    newVisitante.antecedentes = this.visitanteNuevo.antecedentes.toUpperCase().trim();
    newVisitante.nombre = this.visitanteNuevo.nombre.toUpperCase().trim();
        
    this.visitanteService.crearVisitante(newVisitante).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: resp.msg,
        text: `${this.visitanteNuevo.nombre}`,
        showConfirmButton: true,
      })
      this.componentesService.dialogCrearVisitante = false;
    //this.addVisitante.emit( this.getVisitantes());
    });
  }

  

}
