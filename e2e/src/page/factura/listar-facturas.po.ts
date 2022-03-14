import { by, element } from "protractor";

export class ListarFacturas{
    private itemsListaFacturas = element.all(by.css('#listaFacturas li'));

    async contarFacturas(){
        const totalFacturas = await this.itemsListaFacturas.count();
        return totalFacturas;
    }

}