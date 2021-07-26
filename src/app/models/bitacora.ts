import { Motivo } from "./motivo";
import { Persona } from "./persona";
import { Usuario } from "./usuario";
import { VehiculoV } from "./vehiculoV";
import { Visitante } from "./visitante";
import { Acompaniantes } from './acompaniantes';

export class Bitacora {

	id: number;
    fechaCreacion: string;
    horaIngreso: string;
    horaSalida: string;
    acompaniante: string;
    novedad: string;
    tipoBitacora: string;
    autorizadoPor: string;
    motivo: Motivo;
    persona: Persona;
	visitante: Visitante;
    usuario: Usuario;
    usuario_id: number;
    vehiculoVisitante: VehiculoV;
    acompaniates: Acompaniantes[] = [];
}
