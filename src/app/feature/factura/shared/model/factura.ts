import { Jugador } from '@shared/model/jugador';

export class Factura{
    id: number;
    valor: number;
    fechaIngreso: string;
    fechaCaducidad: string;
    jugador: Jugador;
    estado: number;
    descripcion: string;
    meses: number;

    constructor(id: number, jugador: Jugador, descripcion: string, meses: number){
        this.id = id;
        this.jugador = jugador;
        this.descripcion = descripcion;
        this.meses = meses;
    }
}
