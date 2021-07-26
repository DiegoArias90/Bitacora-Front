import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService {

  //Dialogs 
  dialogCrearVisitante = false;
  dialogCrearVehiculo = false;

  dialogEmpleado = false;
  dialogEvento = false;
  dialogVehiculo = false;


  constructor(  ) { }

  // openDialogVisitante(){
  //   this.dialogCrearVisitante = true;
  // }

  // openDialogVehiculo(){
  //   this.dialogCrearVehiculo = true;
  // }

  openDialogEmpleado(){
    this.dialogEmpleado = true;
  }

  openDialogEvento(){
    this.dialogEvento = true;
  }

  openDialogVehiculo(){
    this.dialogVehiculo = true;
  }

  
}
