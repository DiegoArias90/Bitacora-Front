import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {

  CountryService,
  CustomerService,
  EventService,
  IconService,
  NodeService,
  PhotoService,
  ProductService,
  MenuService,
  AppBreadcrumbService,
  BitacoraService,
  PersonaService,
  VisitanteService,
  UsuarioService,
  ComponentesService,
  EmpleadoService,
  EventoService,
  VehiculoService,
  LugarService,
  CotejarInfoService,
  ReportesService
} from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  providers: [
    CountryService,
    CustomerService,
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,
    MenuService,
    AppBreadcrumbService,
    BitacoraService,
    PersonaService,
    VisitanteService,
    UsuarioService,
    ComponentesService,
    EmpleadoService,
    EventoService,
    VehiculoService,
    LugarService,
    CotejarInfoService,
    ReportesService
  ],
})
export class ServiceModule {}
