import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "@core/services/http.service";
import { SharedModule } from "@shared/shared.module";
import { of } from "rxjs";
import { Jugador } from "src/app/feature/jugador/shared/model/jugador";
import { Factura } from "../../shared/model/factura";
import { FacturaService } from "../../shared/service/factura.service";
import { ListarFacturaComponent } from "./listar-factura.component";


describe('ListarFacturaComponent', () => {
    let component: ListarFacturaComponent;
    let fixture: ComponentFixture<ListarFacturaComponent>;
    let service: FacturaService;
    const listaFacturas: any[] = [
        new Factura(1, 255000, '2022-01-05', '2022-04-05', 
            new Jugador(1, 1010101, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Portero', 'Derecho'), 
            1, 'Tres meses', 3),
        new Factura(2, 255000, '2022-01-05', '2022-04-05', 
        new Jugador(2, 1010102, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho'), 
            1, 'Tres meses', 3)
      ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
        declarations: [ListarFacturaComponent],
        imports: [
            CommonModule,
            HttpClientModule,
            RouterTestingModule, 
            SharedModule, 
            BrowserAnimationsModule
        ],
        providers: [FacturaService, HttpService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListarFacturaComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(FacturaService);
        spyOn(service, 'consultar').and.returnValue(
        of(listaFacturas)
        );
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(2).toBe(component.listarFacturas.length);
    });

});