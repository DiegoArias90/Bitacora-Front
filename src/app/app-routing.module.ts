import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


//Modulos Personalizados
import { PagesRoutingModule } from './pages/pages.routing'

//Complementos
import { AppLoginComponent } from './auth/login/app.login.component';
import { AppNotfoundComponent } from './pages/errors/app.notfound.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component:  AppLoginComponent},
    { path: '**', component: AppNotfoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PagesRoutingModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }


       