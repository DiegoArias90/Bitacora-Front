import { Persona } from './persona';
import { TipoEvento } from './tipo-evento';
export class Evento {
    id: number;
    responsable: string;
    fechaCreacion: Date;
    fechaFinalizacion: Date;
    horaInicio: string;
    horaFinalizacion: string;
    detalle: string;
    novedad: string;
    listaInvitados: string;
    estado: boolean;
    persona: Persona;
    tipoEvento: TipoEvento;
}
