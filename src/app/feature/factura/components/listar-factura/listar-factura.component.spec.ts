import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { Jugador } from '@shared/model/jugador';
import { Factura } from '../../shared/model/factura';
import { FacturaService } from '../../shared/service/factura.service';
import { ListarFacturaComponent } from './listar-factura.component';


describe('ListarFacturaComponent', () => {
    let component: ListarFacturaComponent;
    let fixture: ComponentFixture<ListarFacturaComponent>;
    let service: FacturaService;
    const listaFacturas: any[] = [
        new Factura(1, new Jugador(1), 'Un mes', 1),
        new Factura(2, new Jugador(2), 'Un mes', 1)
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
