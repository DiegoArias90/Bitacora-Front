import { Persona } from './persona';
import { TipoEmpleo } from './tipo-empleo';
export class Empleado {
    id: number;
    cedula: string;
    nombre: string;
    apellido: string;
    observacion: string;
    estado: boolean;
    fechaCreacion: string;
    fechaActualizacion: Date;
    persona: Persona;
    tipoEmpleo: TipoEmpleo;
}
