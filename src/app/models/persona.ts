import { TipoPersona } from "./tipo-persona";
;
import { Empleado } from "./empleado"
import { Usuario } from 'src/app/models/usuario';
import { VehiculoP } from './vehiculoP';
import { Evento } from './evento';

export class Persona {
    id: number;
    lote: string;
    razonSocial: string;
    cedula: string;
    nombre: string;
    apellido: string;;
    telefono: string;
    antecedentes: string;
    observacion: string;
    estado: boolean;
    fechaCreacion: string;
    fechaActualizacion: Date;
    email: string;
	tipoPersona: TipoPersona;
    usuario: Usuario;
    vehiculos: VehiculoP[] = [];
    empleados: Empleado[] = [];
    eventos: Evento[] = [];
}
