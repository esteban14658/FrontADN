export class Jugador{
    id: number;
    documento: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    peso: number;
    altura: number;
    posicion: string;
    pieHabil: string;

    constructor(id: number, documento: number, nombre: string, apellido: string, fechaNacimiento: Date, 
        peso: number, altura: number, posicion: string, pieHabil: string){
        this.id = id;
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.peso = peso;
        this.altura = altura;
        this.posicion = posicion;
        this.pieHabil = pieHabil;
    }
}