import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { ReporteGeneral } from '../../../models/reporteGeneral';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  reporteG: ReporteGeneral = new ReporteGeneral();


  constructor(
    private reportesService: ReportesService
  ) { }

  ngOnInit(): void {
  }

  reporteDownload(x: any, nameDocDownload: string): void {
    var newBlob = new Blob([x], { type: "application/pdf" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }
    const data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    link.download = nameDocDownload;

    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {

        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
 }


 consulta(){
   
 }

  informeGeneral(){
    this.reportesService.getReporteGeneral().subscribe( resp => {
      this.reporteDownload(resp, "InformeGeneral.pdf");
    });
  }


   



  
}
