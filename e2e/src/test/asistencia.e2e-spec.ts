import { browser, ExpectedConditions } from "protractor";
import { AppPage } from "../app.po";
import { AsistenciaPage } from "../page/asistencia/asistencia.po";
import { NavbarPage } from "../page/navbar/navbar.po";


describe('workspace-project Asistencia', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let asistencia: AsistenciaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        asistencia = new AsistenciaPage();
    });

    it('Deberia crear asistencias', () => {

        page.navigateTo();
        navBar.clickBotonAsistencias();

        const checkBox = asistencia.obtenerCheckBoxAsistencia();
        browser.wait(ExpectedConditions.visibilityOf(checkBox), 1000, 
        checkBox.locator());

        asistencia.clickCheckboxRegitrarTodos();

        const botonRegistrar = asistencia.obtenerBotonRegistrarAsistencia();
        browser.wait(ExpectedConditions.visibilityOf(botonRegistrar), 1000, 
        botonRegistrar.locator());

        asistencia.clickBotonRegistrarAsistencia();
    });
});