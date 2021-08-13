import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Administracíon',
                items: [
                    { 
                        label: 'Lugares', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/dashboard/lugares']
                    },
                    { 
                        label: 'Residentes', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/dashboard/residentes']
                    },
                    {
                        label: 'Usuarios', 
                        icon: 'pi pi-fw pi-users', 
                        routerLink: ['/dashboard/usuarios']
                    },
                    {
                        label: 'Reportes', 
                        icon: 'pi pi-fw pi-chart-bar', 
                        routerLink: ['/dashboard/reportes']
                    },                   
                ]
            },
            {
                label: 'Usuario',
                items: [
                    {
                        label: 'Bitácora', 
                        icon: 'pi pi-fw pi-slack',
                        routerLink: ['/dashboard/bitacora']
                    },
                    {
                        label: 'Empleados', 
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: ['/dashboard/empleados']
                    },
                    {
                        label: 'Eventos', 
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/dashboard/eventos']
                    },
                    // {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                    // {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
                    // {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    // {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                    // {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                    // {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    // {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    // {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    // {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                    // {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
                    // {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    // {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    // {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    // {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
                ]
            },
        ];
    }
}
