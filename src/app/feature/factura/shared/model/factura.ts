import { Jugador } from "src/app/feature/jugador/shared/model/jugador";

export class Factura{
    id: number;
    valor: number;
    fechaIngreso: Date;
    fechaCaducidad: Date;
    jugador: Jugador;
    estado: number;
    descripcion: string;

    constructor(id: number, valor: number, fechaIngreso: Date, fechaCaducidad: Date, 
        jugador: Jugador, estado: number, descripcion: string){
        this.id = id;
        this.valor = valor;
        this.fechaIngreso = fechaIngreso;
        this.fechaCaducidad = fechaCaducidad;
        this.jugador = jugador;
        this.estado = estado;
        this.descripcion = descripcion;
    }
}