import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Jugador } from 'src/app/feature/jugador/shared/model/jugador';
import { FacturaService } from '../../shared/service/factura.service';
import { CrearFacturaComponent } from './crear-factura.component';

describe('CrearFacturaComponent', () => {
    let component: CrearFacturaComponent;
    let fixture: ComponentFixture<CrearFacturaComponent>;
    let facturaService: FacturaService;
    const listaJugadores: any[] = [
        new Jugador(1),
        new Jugador(2)
      ];

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ CrearFacturaComponent ],
        imports: [
          CommonModule,
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule,
          FormsModule,
          SharedModule,
          BrowserAnimationsModule,
          AppRoutingModule
        ],
        providers: [FacturaService, HttpService],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CrearFacturaComponent);
      component = fixture.componentInstance;
      facturaService = TestBed.inject(FacturaService);
      spyOn(facturaService, 'guardar').and.returnValue(
        of(true)
      );
      spyOn(facturaService, 'listarJugadoresSinFactura').and.returnValue(
          of(listaJugadores)
      );
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Registrando jugador', () => {
      let jugador = new Jugador(1);
      expect(component.facturaForm.valid).toBeFalsy();
      component.facturaForm.controls.jugador.setValue(jugador);
      component.facturaForm.controls.meses.setValue(3);
      component.facturaForm.controls.descripcion.setValue('Tres meses');

      component.crear();

      // Aca validamos el resultado esperado al enviar la petición
      // TODO adicionar expect
    });
});
