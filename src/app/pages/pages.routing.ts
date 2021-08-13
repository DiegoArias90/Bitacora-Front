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
import { LugaresComponent } from './administrador/lugares/lugares.component';
import { RoleGuard } from '../guards/role.guard';



const routes: Routes = [
    { 
        path: 'dashboard', 
        component: AppMainComponent,
        children: [
             { path: 'lugares', component: LugaresComponent, canActivate: [ AuthGuard, RoleGuard ] },
             { path: 'residentes', component: PersonasComponent, canActivate: [ AuthGuard, RoleGuard ] },
             { path: 'usuarios', component: UsuarioComponent, canActivate: [ AuthGuard, RoleGuard ] },
             { path: 'reportes', component: ReportesComponent, canActivate: [ AuthGuard, RoleGuard ] },
             
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
