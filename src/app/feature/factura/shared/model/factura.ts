import { Jugador } from 'src/app/feature/jugador/shared/model/jugador';

export class Factura{
    id: number;
    valor: number;
    fechaIngreso: string;
    fechaCaducidad: string;
    jugador: Jugador;
    estado: number;
    descripcion: string;
    meses: number;

    constructor(id: number, valor: number, fechaIngreso: string, fechaCaducidad: string,
                jugador: Jugador, estado: number, descripcion: string, meses: number){
        this.id = id;
        this.valor = valor;
        this.fechaIngreso = fechaIngreso;
        this.fechaCaducidad = fechaCaducidad;
        this.jugador = jugador;
        this.estado = estado;
        this.descripcion = descripcion;
        this.meses = meses;
    }
}
