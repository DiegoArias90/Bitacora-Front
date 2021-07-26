import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';

//Guards
import { AuthGuard } from '../guards/auth.guard'

//Componentes
import { PersonasComponent } from './administrador/personas/persona/personas.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { UsuarioComponent } from './administrador/usuario/usuario.component';
import { ReportesComponent } from './administrador/reportes/reportes.component';
import { EventosComponent } from './administrador/personas/eventos/eventos.component';
import { EmpleadosComponent } from './administrador/personas/empleados/empleados.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
    { 
        path: 'dashboard', 
        component: AppMainComponent,
        children: [
            // { path: 'main', component: DashboardComponent, canActivate: [ AuthGuard ] },
             { path: 'residentes', component: PersonasComponent, canActivate: [ AuthGuard ] },
             { path: 'usuarios', component: UsuarioComponent, canActivate: [ AuthGuard ] },
             { path: 'reportes', component: ReportesComponent, canActivate: [ AuthGuard ] },
             
             { path: 'eventos', component: EventosComponent, canActivate: [ AuthGuard ] },
             { path: 'empleados', component: EmpleadosComponent, canActivate: [ AuthGuard ] },
             { path: 'bitacora', component: BitacoraComponent, canActivate: [ AuthGuard ] },
            
             { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
