import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

//Componentes principales
import { AppCodeModule } from './app.code.component';
import { AppComponent } from './app.component';
import { AppConfigComponent } from './shared/menuConfig/app.config.component';

//Modulos Creados
import { PagesModule } from './pages/pages.module'
import { AuthModule } from './auth/auth.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ServiceModule } from './services/services.module'

//Modulos Prime
import { ButtonModule} from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AuthModule,
        PagesModule,
        ButtonModule,
        BreadcrumbModule,
        RadioButtonModule,
        InputSwitchModule,
        AppCodeModule,
        ServiceModule,
    ],
    declarations: [
        AppComponent,
        AppConfigComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
