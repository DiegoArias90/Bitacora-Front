import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

import { AppHelpComponent } from './app.help.component';
import { AppNotfoundComponent } from './app.notfound.component';
import { AppErrorComponent } from './app.error.component';
import { AppAccessdeniedComponent } from './app.accessdenied.component';



@NgModule({
  declarations: [
    AppHelpComponent,
    AppNotfoundComponent,
    AppErrorComponent,
    AppAccessdeniedComponent,
  ],
  exports: [
    AppHelpComponent,
    AppNotfoundComponent,
    AppErrorComponent,
    AppAccessdeniedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule
  ]
})
export class ErrorsModule { }
