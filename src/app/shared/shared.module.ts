import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppBreadcrumbComponent } from './breadcrumb/app.breadcrumb.component';
import { AppTopBarComponent } from './header/app.topbar.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuComponent } from './sidebar/app.menu.component';
import { AppMenuitemComponent } from './sidebar/app.menuitem.component'


@NgModule({
  declarations: [
    AppBreadcrumbComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppMenuitemComponent
  ],
  exports: [
    AppBreadcrumbComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppMenuitemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
