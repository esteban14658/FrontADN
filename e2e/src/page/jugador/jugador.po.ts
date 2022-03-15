import { browser, by, element } from 'protractor';

export class JugadorPage{
    private linkCrearJugador = element(by.id('linkCrearJugador'));
    private linkListarJugadores = element(by.id('linkListarJugador'));
    private inputIdJugador = element(by.id('id'));
    private inputDocumento = element(by.id('documento'));
    private inputNombre = element(by.id('nombre'));
    private inputApellido = element(by.id('apellido'));
    private inputFechaNacimiento = element(by.id('fechaNacimiento'));
    private inputPeso = element(by.id('peso'));
    private inputAltura = element(by.id('altura'));
    private inputPosicion = element(by.id('posicion'));
    private inputPieHabil = element(by.id('pieHabil'));
    private inputCategoria = element(by.id('categoria'));
    private inputTipoDeLista = element(by.id('tipoDeLista'));
    private jugadorForm = element(by.id('jugadorForm'));
    private dialogo = element(by.id('mostrarDialogo'));
    private buttonRegistrarJugador = element(by.id('registrarJugador'));
    private buttonRegistrar = element(by.id('registrarJugador'));
    private botonSiConfirmar = element(by.css('cdkFocusInitial'));
    deleteYesButton = () => element(by.id('si'));

    async clickBotonSi() {
        browser.actions().mouseMove(this.botonSiConfirmar).perform();
        browser.sleep(500);
        await this.botonSiConfirmar.click();
    }

    async clickCrearJugador(){
        browser.actions().mouseMove(this.linkCrearJugador).perform();
        browser.sleep(500);
        await this.linkCrearJugador.click();
    }

    obtenerFormularioRegistroJugadores(){
        return this.jugadorForm;
    }

    obtenerDialogo(){
        return this.dialogo;
    }

    obtenerBotonRegistrar(){
        return this.buttonRegistrar;
    }

    async clickListarJugadores(){
        browser.actions().mouseMove(this.linkListarJugadores).perform();
        browser.sleep(500);
        await this.linkListarJugadores.click();
    }

    async ingresarId(idJugador) {
        await this.inputIdJugador.sendKeys(idJugador);
    }

    async ingresarDocumento(documento) {
        await this.inputDocumento.sendKeys(documento);
    }

    async ingresarNombre(nombre) {
        await this.inputNombre.sendKeys(nombre);
    }

    async ingresarApellido(apellido) {
        await this.inputApellido.sendKeys(apellido);
    }

    async ingresarFechaNacimiento(fechaNacimiento) {
        await this.inputFechaNacimiento.sendKeys(fechaNacimiento);
    }

    async ingresarPeso(peso) {
        await this.inputPeso.sendKeys(peso);
    }

    async ingresarAltura(altura) {
        await this.inputAltura.sendKeys(altura);
    }

    async ingresarPosicion(posicion) {
        await this.inputPosicion.sendKeys(posicion);
    }

    async ingresarPieHabil(pieHabil) {
        await this.inputPieHabil.sendKeys(pieHabil);
    }

    async ingresarTipoDeLista(tipoDeLista) {
        await this.inputTipoDeLista.sendKeys(tipoDeLista);
    }

    async ingresarCategoria(categoria) {
        await this.inputCategoria.sendKeys(categoria);
    }

    async clickBotonRegistrarJugador() {
        browser.actions().mouseMove(this.buttonRegistrarJugador).perform();
        browser.sleep(500);
        await this.buttonRegistrarJugador.click();
    }

}
