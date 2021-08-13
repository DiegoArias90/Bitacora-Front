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
import { CotejarInfoService } from '../../services/cotejar-info.service';
import { Empresa } from '../../models/empresa';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {

 //Personas
    personas: Persona[];
    filteredPersonas: Persona[];

  //Visitantes
    visitantes: Visitante[];
    visitanteNuevo: Visitante = new Visitante();
    dataVisitante: Visitante = new Visitante();
    filteredVisitates: any[];
    dialogVisitante = false;

    autorizados: Autorizacion[];

  //Vehiculos Visitas
    filteredVehiculoVisitates: any[];
    vehiculoVisitante: VehiculoV[];
    vehiculoNuevo: VehiculoV = new VehiculoV();
    dataVehiculo: VehiculoV = new VehiculoV();
    dialogVehiculo = false;

    vehiculoBuscar: VehiculoV[];


  //Bitacora
    bitacoras: Bitacora[];
    bitacorasOrdenadas: Bitacora[];
    tipoBitacora: string = "VEHICULAR";
    selectedbitacoras: Bitacora[];
    bitacora: Bitacora = new Bitacora();
    nombrePj: any

  //Pasajeros
  acompaniantes: FormArray;
  acompaniante: any;
  dialogPasajeros = false;
  formPasajeros: FormGroup;

  skillsForm: FormGroup;

  //Adicionales
  selectedAutorizados: Autorizacion;
  motivos: Motivo[];
  loading: boolean = false;

  
  constructor(
    private personaService: PersonaService,
    private bitacoraService: BitacoraService,
    private visitanteService: VisitanteService,
    public authService: AuthService,
    private cotejarInfoService: CotejarInfoService,
    private fb: FormBuilder
  ) { 

  }

  addPj(){
    let nuevoPj = new Acompaniantes();
        nuevoPj.nombre = this.nombrePj;
      this.bitacora.acompaniates.push( nuevoPj );
      console.log( this.bitacora.acompaniates);
      
  }
  

  
  


  ngOnInit(): void {
    this.getPersonas();
    this.getMotivos();
    this.getVisitantes();
    this.getVehiculoVisitantes();
    //this.getBitacorasOrdenadas();
    this.getBitacoraByEmpresa();
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
      this.vehiculoBuscar = vehiculos;          
    });
  }


   pasajeros(e){
     let pj = e.valor;
     if(pj === 'Si'){
      this.dialogPasajeros = true;
     } else {
      this.dialogPasajeros = false;
     }
     return this.dialogPasajeros;
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
    for (let i = 0; i < this.vehiculoBuscar.length; i++) {
        const vehiculo = this.vehiculoBuscar[i];
        if (vehiculo.placa.toLowerCase().indexOf(query.toLowerCase()) === 0 ) {
            filtered.push(vehiculo);
        }        
    }
    this.filteredVehiculoVisitates = filtered;    
  }

  
  // getBitacorasOrdenadas(){
  //   this.bitacoraService.getBitacoraOrdenada().subscribe( bitacoras => {
  //     this.bitacorasOrdenadas = bitacoras;
  //   });
  // }

  getBitacoraByEmpresa(){
    this.bitacoraService.getBitacorasByEmpresa().subscribe( bitacoras => {
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
      newbitacora.acompaniante = this.bitacora.acompaniante ? this.bitacora.acompaniante : 'NO';
      newbitacora.acompaniates = this.bitacora.acompaniates ? this.bitacora.acompaniates : null;
      newbitacora.motivo = this.bitacora.motivo;
      newbitacora.autorizadoPor = this.selectedAutorizados.nombre;
      newbitacora.novedad = (this.bitacora.novedad != null ? this.bitacora.novedad.toUpperCase().trim() : "");
      newbitacora.empresa_id = (this.authService.empresa); 
      console.log(newbitacora);
      
            //  this.bitacoraService.crearBitacora(newbitacora).subscribe( resp => {
            //    console.log(resp);
            //   Swal.fire({
            //     icon: 'success',
            //     title: resp.msg,
            //     timer: 1500
            //  })
            //    this.cleanForm();
            //   this.getBitacoraByEmpresa(); 
            //  });
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
                this.getBitacoraByEmpresa();
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
    this.bitacora.autorizadoPor = ""
  }

  cleanFormVehiculo(){
    this.vehiculoNuevo.placa = '';
    this.dataVehiculo.tipoVehiculo =  '';
    this.dataVehiculo.marca =  '';
    this.dataVehiculo.anioAuto =  '';
    this.dataVehiculo.color =  '';
    this.dataVehiculo.modelo =  '';
    this.dataVehiculo.detalle =  '';
  }

  cleanFormVisitante(){
    this.visitanteNuevo.cedula = '';
    this.dataVisitante.antecedentes =  '';
    this.dataVisitante.nombre =  '';
  }

   crearVehiculo(){
    this.loading = true;
     let newVehiculo = new VehiculoV();
     newVehiculo.placa = (this.dataVehiculo.placa != null ? this.dataVehiculo.placa.toUpperCase().trim() : this.dataVehiculo.placa);
     newVehiculo.tipoVehiculo = this.dataVehiculo.tipoVehiculo!= null ? this.dataVehiculo.tipoVehiculo.toUpperCase().trim() : this.dataVehiculo.tipoVehiculo;
     newVehiculo.marca = this.dataVehiculo.marca != null ? this.dataVehiculo.marca.toUpperCase().trim() : this.dataVehiculo.marca;
     newVehiculo.anioAuto = this.dataVehiculo.anioAuto != null ? this.dataVehiculo.anioAuto : this.dataVehiculo.anioAuto;
     newVehiculo.color = this.dataVehiculo.color != null ? this.dataVehiculo.color.toUpperCase().trim() : this.dataVehiculo.color;
     newVehiculo.modelo = this.dataVehiculo.modelo != null ? this.dataVehiculo.modelo.toUpperCase().trim() : this.dataVehiculo.modelo;
     newVehiculo.detalle = this.dataVehiculo.detalle != null ? this.dataVehiculo.detalle.toUpperCase().trim() : this.dataVehiculo.detalle;
     this.visitanteService.crearVehiculo(newVehiculo).subscribe( resp => {
      this.loading = false;
       Swal.fire({
         icon: 'success',
         title: resp.msg,
         text: `${this.vehiculoNuevo.placa}`,
         showConfirmButton: true,
       });
       
       this.getVehiculoVisitantes();
       this.dialogVehiculo = false;
       this.cleanFormVehiculo();
       
     }, err => {

      if(err.status == 400){
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Campos vacios',
          text: err.error.errors[0],
          showConfirmButton: true,
        });
      }

      if(err.status == 500){
        this.loading = false;
        Swal.fire({
          icon: 'warning',
          title: 'Datos duplicados',
          text: 'La placa ingresada ya exite!',
          showConfirmButton: true,
        });
      }
     });
   }

   crearVisitante(){
     let newVisitante = new Visitante();
     newVisitante.cedula = (this.visitanteNuevo.cedula != null ? this.visitanteNuevo.cedula.trim() : this.visitanteNuevo.cedula);
     newVisitante.antecedentes = this.dataVisitante.antecedentes;
     newVisitante.nombre =  this.dataVisitante.nombre;
     this.visitanteService.crearVisitante(newVisitante).subscribe( resp => {
       Swal.fire({
         icon: 'success',
         title: resp.msg,
         text: `${this.visitanteNuevo.nombre}`,
         showConfirmButton: true,
       })
       this.getVisitantes();
       this.cleanFormVisitante();
       this.dialogVisitante = false;
     }, err => {

      if(err.status == 400){
        Swal.fire({
          icon: 'error',
          title: 'Campos vacios',
          text: err.error.errors[0],
          showConfirmButton: true,
        });
      }

      if(err.status == 500){
        Swal.fire({
          icon: 'warning',
          title: 'Datos duplicados',
          text: 'La cédula ingresada ya exite!',
          showConfirmButton: true,
        });
      }
     });
   }


   buscarAntecedentes(){
     this.loading = true;
    let antecedentesVisitante = new Visitante();    
    antecedentesVisitante.cedula = this.visitanteNuevo.cedula;
    if(  antecedentesVisitante.cedula === undefined  ){
      Swal.fire({
        icon: 'error',
        title: 'Información Incorrecta',
        text: 'Debe ingresar una cédula',
        showConfirmButton: true,
      });
      this.loading = false;
      return;
    }

     this.cotejarInfoService.buscarAntecedentes(antecedentesVisitante).subscribe( persona => {
      
        if(persona[0].error.length > 0){
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Información Incorrecta',
            text: 'Debe ingresar una cedula valida',
            showConfirmButton: true,
          });
         
        }else if( persona[0].antecedent === 'SI' ){
          this.loading = false;
          Swal.fire({
            icon: 'warning',
            title: 'Persona con antecedentes',
            text: 'La persona no debe ingresar',
            showConfirmButton: true,
          });
         
        } else {
          this.loading = false;
          this.dataVisitante.antecedentes = persona[0].antecedent;
          this.dataVisitante.nombre = persona[0].name;
        }

        
     }, err => {
       console.log(err);
       
     });
   }


   buscarVehiculoPlacas(){
    this.loading = true;
    let datosVehiculo = new VehiculoV();
    datosVehiculo.placa = this.vehiculoNuevo.placa;
    if(  datosVehiculo.placa === undefined  ){
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Información Incorrecta',
        text: 'Debe ingresar una placa',
        showConfirmButton: true,
      });
      return;
    }
    
    this.cotejarInfoService.buscarVehiculoPlaca( datosVehiculo.placa ).subscribe( datosVehiculos => {

        if(datosVehiculos.numeroPlaca == null){
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Información Incorrecta',
            text: 'Debe ingresar una placa valida',
            showConfirmButton: true,
          });
          return;
        }
        this.loading = false;
        this.dataVehiculo.placa = datosVehiculos.numeroPlaca;
        this.dataVehiculo.tipoVehiculo = datosVehiculos.nombreClase;
        this.dataVehiculo.marca = datosVehiculos.descripcionMarca;
        this.dataVehiculo.color = datosVehiculos.colorVehiculo1;
        this.dataVehiculo.modelo = datosVehiculos.descripcionModelo;
        this.dataVehiculo.anioAuto = datosVehiculos.anioAuto;
      
    }, err => {
      if(err.status == 400){
        
        Swal.fire({
          icon: 'error',
          title: 'Campos vacios',
          text: err.error.errors,
          showConfirmButton: true,
        });
        this.loading = false;
      }
      
    });   
   }
  
}
