export class Usuario {
    id: number;
    username: string;
	password: string;
	cedula: string;
	nombre: string;
	apellido: string;
	telefono: string;
	observacion: string;
	estado: boolean;
	roles: string[] = []
	empresas: any[] = [];
}
