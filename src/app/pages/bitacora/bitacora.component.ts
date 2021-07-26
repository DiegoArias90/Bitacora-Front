import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { Motivo } from 'src/app/models/motivo';
import { Bitacora } from 'src/app/models/bitacora';
import { Visitante } from 'src/app/models/visitante';
 import { VehiculoV } from '../../models/vehiculoV';
import { VisitanteService, BitacoraService, PersonaService } from '../../services/services.index'
import Swal from 'sweetalert2';
import * as moment from 'moment/moment';
import { AuthService } from 'src/app/auth/auth.service';
import { Acompaniantes } from '../../models/acompaniantes';
import { Autorizacion } from '../../models/autorizacion';
import { Usuario } from 'src/app/models/usuario';



@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {

  usserLogged: Usuario;

  //BUSQUEDA
  selectedPersonas: any[];
  selectedVisitantes: any[];
  selectedVehiculoVisitantes: any[];

  autorizados: Autorizacion[];
  selectedAutorizados: Autorizacion;

  filteredPersonas: Persona[];
  filteredVisitates: any[];
  filteredVehiculoVisitates: any[];


  personas: Persona[];
  visitantes: Visitante[];
  vehiculoVisitante: VehiculoV[];
  vehiculoNuevo: VehiculoV = new VehiculoV();
  motivos: Motivo[];
  bitacoras: Bitacora[];
  bitacorasOrdenadas: Bitacora[];

  tipoBitacora: string = "VEHICULAR";
  selectedbitacoras: Bitacora[];
  bitacora: Bitacora = new Bitacora();
  acompaniantes: Acompaniantes = new Acompaniantes();
  acompaniante: any;

  visitanteNuevo: Visitante = new Visitante();


  dialogVisitante = false;
  dialogVehiculo = false;



  constructor(
    private personaService: PersonaService,
    private bitacoraService: BitacoraService,
    private visitanteService: VisitanteService,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.getPersonas();
    this.getMotivos();
    this.getVisitantes();
    this.getVehiculoVisitantes();
    this.getBitacorasOrdenadas();
    this.getAutorizados();
    this.getAcompaniante();
  }

  getAutorizados(){
    this.autorizados = [
      {nombre: 'Administrador/a'},
      {nombre: 'Propietario/a'},
      {nombre: 'Hijo/a Propietario'},
      {nombre: 'Empleado/a'},
    ]
  }
  getAcompaniante(){
    this.acompaniante = [
      {valor: 'Si'},
      {valor: 'No'}
    ]
  }

  tipoBitacoras(): boolean{
    if( this.tipoBitacora  == 'VEHICULAR'){
      return true;
    }
    return false;
  }

   getPersonas(){
     this.personaService.getPersonas().subscribe( persona => {
       this.personas = persona;   
     });
   }
  
  getMotivos(){
    this.bitacoraService.getMotivo().subscribe( motivo => {
      this.motivos = motivo;
     });
  }

   getVisitantes(){
     this.visitanteService.getVisitantes().subscribe( visitantes => {
       this.visitantes = visitantes;     
     });
   }

   getVehiculoVisitantes(){
     this.visitanteService.getVehiculoVisitantes().subscribe( vehiculos => {
       this.vehiculoVisitante = vehiculos;     
     });
   }

  filterPersona(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.personas.length; i++) {
        const persona = this.personas[i];
        if (persona.lote.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(persona);
        }
    }
    this.filteredPersonas = filtered;
  }

   filterVisitante(event) {
     const filtered: any[] = [];
     const query = event.query;
      for (let i = 0; i < this.visitantes.length; i++) {
         const visitante = this.visitantes[i];
         if (visitante.cedula.toLowerCase().indexOf(query.toLowerCase()) == 0) {
             filtered.push(visitante);
         }
     }
     this.filteredVisitates = filtered;
   }

   filterVehiculo(event) {
     const filtered: any[] = [];
     const query = event.query;
     for (let i = 0; i < this.vehiculoVisitante.length; i++) {
         const vehiculo = this.vehiculoVisitante[i];
         if (vehiculo.placa.toLowerCase().indexOf(query.toLowerCase()) == 0) {
             filtered.push(vehiculo);
         }        
     }
     this.filteredVehiculoVisitates = filtered;    
   }

  
  getBitacorasOrdenadas(){
    this.bitacoraService.getBitacoraOrdenada().subscribe( bitacoras => {
      this.bitacorasOrdenadas = bitacoras;
    });
  }

  getBitacora( idBitacora:number ){
    if(idBitacora){
      this.bitacoraService.getBitacora(idBitacora).subscribe( bitacora => {
        if(bitacora){
          this.bitacora = bitacora;
        }        
      })
    }
  }

  openDialogVisitante(){
    this.dialogVisitante = true;

  }


  openDialogVehiculo(){
    this.dialogVehiculo = true;
  }


   crearBitacora(){
      let newbitacora = new Bitacora();
      newbitacora.tipoBitacora = this.tipoBitacora;
      newbitacora.persona = this.bitacora.persona;
      newbitacora.visitante = this.bitacora.visitante;
      newbitacora.vehiculoVisitante = this.bitacora.vehiculoVisitante ? this.bitacora.vehiculoVisitante : null;
      newbitacora.acompaniante = this.bitacora.acompaniante ? this.bitacora.acompaniante : 'No';
      newbitacora.motivo = this.bitacora.motivo;
      newbitacora.autorizadoPor = this.selectedAutorizados.nombre;
      newbitacora.novedad = (this.bitacora.novedad != null ? this.bitacora.novedad.toUpperCase().trim() : this.bitacora.novedad);
      // newbitacora.usuario = this.authService.usuario; 
            this.bitacoraService.crearBitacora(newbitacora).subscribe( resp => {
             Swal.fire({
               icon: 'success',
               title: resp.msg,
               timer: 1500
            })
              this.cleanForm();
             this.getBitacorasOrdenadas(); 
            });
   }

  updateBitacora(bitacora: Bitacora){
    let now = moment().format('h:mm:ss');
    try {
      this.bitacoraService.getBitacora(bitacora.id).subscribe( bitacoraAux => {
        if( bitacoraAux != null ){
          bitacoraAux.horaSalida = now;
            this.bitacoraService.updateBitacora(bitacoraAux).subscribe( bitacora => {
              if(bitacora){
                Swal.fire({
                  icon: 'success',
                  title: 'El visitante a salido!',
                  timer: 1500
                });
                this.getBitacorasOrdenadas();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'El visitante no a podido dar de alta!',
                  showConfirmButton: true,
                });
              }
            })
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'El visitante no a podido dar de alta!',
            showConfirmButton: true,
          });
        }
      });
     } catch (error) {
       Swal.fire({
         icon: 'error',
         title: 'El Persona no pudo ser actualizado!',
         showConfirmButton: true,
        })
     }
    
  }

  cleanForm(){
    this.tipoBitacora = "VEHICULAR";
    this.bitacora.persona =  null;
    this.bitacora.visitante = null;
    if(  this.tipoBitacora == "VEHICULAR"){
      this.bitacora.vehiculoVisitante = null;
      this.bitacora.acompaniante = "No"
    }
    this.bitacora.motivo = null;
    this.bitacora.autorizadoPor = null
  }

   crearVehiculo(){
     let newVehiculo = new VehiculoV();
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
       this.dialogVehiculo = false;
     });
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
       this.getVisitantes();
       this.dialogVisitante = false;
     });
   }
  
}
