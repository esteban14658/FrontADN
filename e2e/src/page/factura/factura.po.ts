import { browser, by, element } from "protractor";

export class FacturaPage{
    private linkCrearFactura = element(by.id('linkCrearFactura'));
    private linkListarFacturas = element(by.id('linkListarFacturas'));
    private inputIdFactura = element(by.id('id'));
    private inputValor = element(by.id('documento'));
    private inputFechaIngreso = element(by.id('fechaIngreso'));
    private inputFechaCaducidad = element(by.id('fechaCaducidad'));
    private inputJugador = element(by.id('jugador'));
    private inputEstado = element(by.id('estado'));
    private inputDescripcion = element(by.id('descripcion'));
    private inputMeses = element(by.id('meses'));

    private buttonRegistrar = element(by.id('registrarFactura'));
    private buttonRegistrarFactura = element(by.id('registrarFactura'));
    private facturaForm = element(by.id('facturaForm'));
    private listaFacturas = element.all(by.css('ul.facturas li'));

    async clickCrearFactura(){
        browser.actions().mouseMove(this.linkCrearFactura).perform();
        browser.sleep(500);
        await this.linkCrearFactura.click();
    }

    async clickListarFacturas(){
        browser.actions().mouseMove(this.linkListarFacturas).perform();
        browser.sleep(500);
        await this.linkListarFacturas.click();
    }

    obtenerFormularioRegistroFacturas() {
        return this.facturaForm;
    }

    obtenerBotonRegistrar() {
        return this.buttonRegistrar;
    }

    async ingresarId(idFactura) {
        await this.inputIdFactura.sendKeys(idFactura);
    }

    async ingresarValor(valor) {
        await this.inputValor.sendKeys(valor);
    }

    async ingresarFechaIngreso(fechaIngreso) {
        await this.inputFechaIngreso.sendKeys(fechaIngreso);
    }

    async ingresarFechaCaducidad(fechaCaducidad) {
        await this.inputFechaCaducidad.sendKeys(fechaCaducidad);
    }

    async ingresarJugador(jugador) {
        await this.inputJugador.sendKeys(jugador);
    }

    async ingresarEstado(estado) {
        await this.inputEstado.sendKeys(estado);
    }

    async ingresarDescripcion(descripcion) {
        await this.inputDescripcion.sendKeys(descripcion);
    }

    async ingresarMeses(meses) {
        await this.inputMeses.sendKeys(meses);
    }

    async contarFacturas() {
        return this.listaFacturas.count();
    }

    async clickBotonRegistrarFactura() {
        browser.actions().mouseMove(this.buttonRegistrarFactura).perform();
        browser.sleep(500);
        await this.buttonRegistrarFactura.click();
    }

}