import { browser, ExpectedConditions } from "protractor";
import { AppPage } from "../app.po";
import { FacturaPage } from "../page/factura/factura.po";
import { NavbarPage } from "../page/navbar/navbar.po";

describe('workspace-project Factura', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let factura: FacturaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        factura = new FacturaPage();
    });

    it('Deberia crear factura', () => {
        const JUGADOR = 1;
        const DESCRIPCION = 'Tres meses';
        const MESES = 3;

        page.navigateTo();
        navBar.clickBotonFacturas();
        factura.clickCrearFactura();

        const formularioFactura = factura.obtenerFormularioRegistroFacturas();
        browser.wait(ExpectedConditions.visibilityOf(formularioFactura), 1000, 
        formularioFactura.locator());

        factura.ingresarJugador(JUGADOR);
        factura.ingresarDescripcion(DESCRIPCION);
        factura.ingresarMeses(MESES);

        const botonRegistrarFactura = factura.obtenerBotonRegistrar();
        browser.wait(ExpectedConditions.visibilityOf(botonRegistrarFactura), 1000, 
        botonRegistrarFactura.locator());

        factura.clickBotonRegistrarFactura();

        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar facturas', () => {
        page.navigateTo();
        navBar.clickBotonFacturas();
        factura.clickListarFacturas();

        
    });
});