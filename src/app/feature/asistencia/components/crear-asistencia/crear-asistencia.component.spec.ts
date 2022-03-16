import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "@core/services/http.service";
import { SharedModule } from "@shared/shared.module";
import { of } from "rxjs";
import { Jugador } from "src/app/feature/jugador/shared/model/jugador";
import { JugadorService } from "src/app/feature/jugador/shared/service/jugador.service";
import { Asistencia } from "../../shared/model/asistencia";
import { AsistenciaService } from "../../shared/service/asistencia.service";
import { CrearAsistenciaComponent } from "./crear-asistencia.component";


describe('CrearAsistenciaComponent', () => {
    let component: CrearAsistenciaComponent;
    let fixture: ComponentFixture<CrearAsistenciaComponent>;
    let jugadorService: JugadorService;
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
        providers: [AsistenciaService, JugadorService, HttpService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrearAsistenciaComponent);
        component = fixture.componentInstance;
        jugadorService = TestBed.inject(JugadorService);
        spyOn(jugadorService, 'listarJugadoresSinAsistencia').and.returnValue(
        of(listaJugadores)
        );
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(2).toBe(component.listaJugadores.length);
    });

});