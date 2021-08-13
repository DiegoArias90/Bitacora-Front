import { Motivo } from "./motivo";
import { Persona } from "./persona";
import { VehiculoV } from "./vehiculoV";
import { Visitante } from "./visitante";
import { Acompaniantes } from './acompaniantes';
import { Empresa } from './empresa';

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
    usuario_id: number;
    empresa_id: any;
    empresa = Empresa;
    vehiculoVisitante: VehiculoV;
    acompaniates: Acompaniantes[] = [];
}
