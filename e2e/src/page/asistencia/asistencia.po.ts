import { browser, by, element } from 'protractor';

export class AsistenciaPage{

    private checkboxRegistrarTodos = element(by.id('checkboxRegistrarTodos'));
    private buttonRegistrarAsistencia = element(by.id('registrarAsistencia'));

    async clickCheckboxRegitrarTodos() {
        browser.actions().mouseMove(this.checkboxRegistrarTodos).perform();
        browser.sleep(500);
        await this.checkboxRegistrarTodos.click();
    }

    async clickBotonRegistrarAsistencia() {
        browser.actions().mouseMove(this.buttonRegistrarAsistencia).perform();
        browser.sleep(500);
        await this.buttonRegistrarAsistencia.click();
    }

    obtenerBotonRegistrarAsistencia(){
        return this.buttonRegistrarAsistencia;
    }

    obtenerCheckBoxAsistencia(){
        return this.checkboxRegistrarTodos;
    }
}
