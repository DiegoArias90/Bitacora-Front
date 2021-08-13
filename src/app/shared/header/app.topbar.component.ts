import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AppMainComponent} from '../../pages/app.main.component';
import { AuthService } from '../../auth/auth.service'
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit{

    user: Usuario

    constructor(
        public appMain: AppMainComponent, 
        public app: AppComponent,
        private authService: AuthService,
        private router: Router
        ) {
            this.getDatos();
    }
    
    ngOnInit(): void {
       // this.getDatos();
    
      }

    getDatos(){
        this.user = this.authService.usuario;
    }

    logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
