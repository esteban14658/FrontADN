import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkJugador = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkFactura = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));
    linkAsistencia = element(by.xpath('/html/body/app-root/app-navbar/nav/a[4]'));

    async clickBotonJugadores() {
        await this.linkJugador.click();
    }

    async clickBotonFacturas() {
        await this.linkFactura.click();
    }

    async clickBotonAsistencias() {
        await this.linkAsistencia.click();
    }
}
