import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// ...
import { ReactiveFormsModule } from '@angular/forms';


//Interceptor
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { AuthInterceptor } from '../interceptor/auth.interceptor'

//Modulos PrimeNg
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {PanelModule} from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {FieldsetModule} from 'primeng/fieldset';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {FileUploadModule} from 'primeng/fileupload';

//Modulos Creados
import { SharedModule } from '../shared/shared.module';
import { MenuService } from '../shared/sidebar/app.menu.service';
import { ErrorsModule } from './errors/errors.module';

//Dialogs
import { VisitanteComponent } from '../components/visitantes/visitante/visitante.component';
//import { VehiculoComponent } from '../components/visitantes/vehiculo/vehiculo.component';


//Componentes
import { AppMainComponent } from './app.main.component';

import { PersonasComponent } from '../pages/administrador/personas/persona/personas.component';
import { EmpleadoComponent } from '../components/personas/empleado/empleado.component';
import { EventoComponent } from '../components/personas/evento/evento.component';

import { UsuarioComponent } from './administrador/usuario/usuario.component';
import { ReportesComponent } from './administrador/reportes/reportes.component';

import { BitacoraComponent } from './bitacora/bitacora.component';
import { EmpleadosComponent } from './administrador/personas/empleados/empleados.component';
import { EventosComponent } from './administrador/personas/eventos/eventos.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VehiculoComponent } from '../components/personas/vehiculo/vehiculo.component';



@NgModule({
  declarations: [
    AppMainComponent,
    PersonasComponent,
    BitacoraComponent,
    UsuarioComponent,
    VisitanteComponent,
    VehiculoComponent,
    ReportesComponent,
    EmpleadosComponent,
    EventosComponent,
    DashboardComponent,
    EmpleadoComponent,
    EventoComponent
  ],
  exports: [
    AppMainComponent,
    PersonasComponent,
    BitacoraComponent,
    UsuarioComponent,
    VisitanteComponent,
    VehiculoComponent,
    ReportesComponent,
    EmpleadosComponent,
    EventosComponent,
    DashboardComponent,
    EmpleadoComponent,
    EventoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ErrorsModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    CheckboxModule,
    InputTextareaModule,
    RadioButtonModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    PanelModule,
    TabViewModule,
    MessagesModule,
    MessageModule,
    MultiSelectModule,
    CalendarModule,
    FieldsetModule,
    ToggleButtonModule,
    FileUploadModule
  ],
  providers: [
    MenuService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class PagesModule { }
