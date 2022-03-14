import { by, element } from "protractor";

export class ListarJugadoresPage{
    private itemsListaJugadores = element.all(by.css('./table'));
    private rows = this.itemsListaJugadores.all(by.tagName('th'));
    private cells = this.rows.all(by.tagName('td'));

    async contarFacturas(){
        const totalJugadores = await this.itemsListaJugadores.count();
        return totalJugadores;
    }

    obtenerCeldas() {
        return this.cells;
    }

}