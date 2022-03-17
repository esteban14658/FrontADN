import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { Jugador } from '@shared/model/jugador';
import { Asistencia } from '../../shared/model/asistencia';
import { AsistenciaService } from '../../shared/service/asistencia.service';
import { CrearAsistenciaComponent } from './crear-asistencia.component';


describe('CrearAsistenciaComponent', () => {
    let component: CrearAsistenciaComponent;
    let fixture: ComponentFixture<CrearAsistenciaComponent>;
    let asistenciaService: AsistenciaService;
    const jugador: Jugador = new Jugador(2);
    const listaJugadores: any[] = [
            Object.assign(new Asistencia(1, '2022-03-12', jugador), {jugador}),
            Object.assign(new Asistencia(1, '2022-03-13', jugador), {jugador})
      ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
        declarations: [CrearAsistenciaComponent],
        imports: [
            CommonModule,
            HttpClientModule,
            RouterTestingModule,
            SharedModule,
            BrowserAnimationsModule
        ],
        providers: [AsistenciaService, HttpService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrearAsistenciaComponent);
        component = fixture.componentInstance;
        asistenciaService = TestBed.inject(AsistenciaService);
        spyOn(asistenciaService, 'listarJugadoresSinAsistencia').and.returnValue(
        of(listaJugadores)
        );
        spyOn(asistenciaService, 'guardar').and.returnValue(
        of(true)
        );
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(3).toBe(component.listaJugadores.length);
    });

    it('Registrando asistencias', () => {
        let jugador = new Jugador(1);
        component.listaJugadores.push(jugador);
        const retorno = component.agregar();
  
        expect(true).toBe(retorno);

    });

});
