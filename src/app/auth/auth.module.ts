import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';

import { AppLoginComponent } from './login/app.login.component';



@NgModule({
  declarations: [
    AppLoginComponent
  ],
  exports: [
    AppLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ]
})
export class AuthModule { }
