import { HttpHeaders } from "@angular/common/http";


export const HTTPHEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

export const CREDENCIALES = btoa('bitacoraapp' + ':' + 'grunseg');

export const HTTPHEADERS_LOGIN = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + CREDENCIALES});
