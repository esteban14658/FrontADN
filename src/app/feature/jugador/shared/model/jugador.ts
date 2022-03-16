export class Jugador{

    id: number;
    documento: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    peso: number;
    altura: number;
    posicion: string;
    pieHabil: string;
    seleccionado: boolean;
    
    constructor(id: number){
        this.id = id;
    }
}
