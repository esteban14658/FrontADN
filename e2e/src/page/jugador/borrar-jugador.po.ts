import { browser, by, element } from "protractor";

export class BorrarJugadorDialogPage{
    private botonSiConfirmar = element(by.css('cdkFocusInitial'));

    async clickBotonSi() {
        browser.actions().mouseMove(this.botonSiConfirmar).perform();
        browser.sleep(500);
        await this.botonSiConfirmar.click();
    }

    async obtenerBotonSi(){
        return this.botonSiConfirmar;
    }

}