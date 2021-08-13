import { TipoPersona } from "./tipo-persona";
import { Empleado } from "./empleado"
import { VehiculoP } from './vehiculoP';
import { Evento } from './evento';
import { Empresa } from './empresa';

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
    usuario_id: number;
    vehiculos: VehiculoP[] = [];
    empleados: Empleado[] = [];
    eventos: Evento[] = [];
    empresa_id: any;
    empresa: Empresa
}
