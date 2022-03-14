import { browser, by, element } from "protractor";

export class BorrarJugadorDialogPage{
    private botonSi = element(by.id('si'));
    private buttonConfirmar = element(by.id('si'));

    async clickBotonSi() {
        browser.actions().mouseMove(this.botonSi).perform();
        browser.sleep(500);
        await this.botonSi.click();
    }

    async obtenerBotonSi(){
        return this.buttonConfirmar;
    }
}