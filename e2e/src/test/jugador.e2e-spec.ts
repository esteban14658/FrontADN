import { browser, ExpectedConditions } from "protractor";
import { AppPage } from "../app.po";
import { BorrarJugadorDialogPage } from "../page/jugador/borrar-jugador.po";
import { JugadorPage } from "../page/jugador/jugador.po";
import { ListarJugadoresPage } from "../page/jugador/listar-jugadores.po";
import { NavbarPage } from "../page/navbar/navbar.po";

describe('workspace-project Jugador', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let jugador: JugadorPage;
    let listaJugadores: ListarJugadoresPage;
    let borrarJugador: BorrarJugadorDialogPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        jugador = new JugadorPage();
        listaJugadores = new ListarJugadoresPage();
        borrarJugador = new BorrarJugadorDialogPage();
    });

    it('Deberia crear jugador', () => {
        const DOCUMENTO = 11111;
        const NOMBRE = 'Esteban';
        const APELLIDO = 'Beltran';
        const FECHA_NACIMIENTO = '2012-02-11';
        const PESO = 57.2;
        const ALTURA = 1.82;
        const POSICION = 'Delantero';
        const PIE_HABIL = 'Derecho';

        page.navigateTo();
        navBar.clickBotonJugadores();
        jugador.clickCrearJugador();

        const formularioJugador = jugador.obtenerFormularioRegistroJugadores();
        browser.wait(ExpectedConditions.visibilityOf(formularioJugador), 1000, 
        formularioJugador.locator());

        jugador.ingresarDocumento(DOCUMENTO);
        jugador.ingresarNombre(NOMBRE);
        jugador.ingresarApellido(APELLIDO);
        jugador.ingresarFechaNacimiento(FECHA_NACIMIENTO);
        jugador.ingresarPeso(PESO);
        jugador.ingresarAltura(ALTURA);
        jugador.ingresarPosicion(POSICION);
        jugador.ingresarPieHabil(PIE_HABIL);

        const botonRegistrarJugador = jugador.obtenerBotonRegistrar();
        browser.wait(ExpectedConditions.visibilityOf(botonRegistrarJugador), 1000, 
        botonRegistrarJugador.locator());

        jugador.clickBotonRegistrarJugador();

        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar jugadores', () => {
        const POSICION = 'Delantero';
        const PIE_HABIL = 'Derecho';
        const CATEGORIA = '2010';
        const LISTAR_TODOS = 'Listar todos';
        const OBTENER_EQUIPO = 'Equipo aleatorio';
        const LISTAR_POR_POSICION = 'Listar por posicion';
        const LISTAR_POR_PIE_HABIL = 'Listar por pie habil';
        const LISTAR_POR_CATEGORIA = 'Listar por categoria';

        page.navigateTo();
        navBar.clickBotonJugadores();
        jugador.clickListarJugadores();
        jugador.ingresarTipoDeLista(LISTAR_TODOS);
        jugador.ingresarTipoDeLista(OBTENER_EQUIPO);
        jugador.ingresarTipoDeLista(LISTAR_POR_POSICION);
        jugador.ingresarPosicion(POSICION);
        jugador.ingresarTipoDeLista(LISTAR_POR_PIE_HABIL);
        jugador.ingresarPieHabil(PIE_HABIL);
        jugador.ingresarTipoDeLista(LISTAR_POR_CATEGORIA);
        jugador.ingresarCategoria(CATEGORIA);
    });

    it('Deberia eliminar un jugador', () => {
        const LISTAR_TODOS = 'Listar todos';

        page.navigateTo();
        navBar.clickBotonJugadores();
        jugador.clickListarJugadores();
        jugador.ingresarTipoDeLista(LISTAR_TODOS);
        
        listaJugadores.obtenerCeldas();

        const dialogo = jugador.obtenerDialogo();
        browser.wait(ExpectedConditions.visibilityOf(dialogo), 1000, 
        dialogo.locator());

        /*const confirmar = jugador.obtenerBotonConfirmar();
        browser.wait(ExpectedConditions.visibilityOf(confirmar), 1000, 
        confirmar.locator());*/
        //borrarJugador.clickBotonSi();

        browser.switchTo().alert().accept();
        
    });
});
