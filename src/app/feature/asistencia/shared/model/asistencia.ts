import { Jugador } from 'src/app/feature/jugador/shared/model/jugador';

export class Asistencia {
    id: number;
    fecha: string;
    jugador: Jugador;

    constructor(id: number, fecha: string, jugador: Jugador){
        this.id = id;
        this.fecha = fecha;
        this.jugador = jugador;
    }
}