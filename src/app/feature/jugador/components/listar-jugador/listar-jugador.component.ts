import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajeService } from '@core/services/mensaje.service';
import { DtoPosiciones } from '../../shared/model/dtoPosiciones';
import { Jugador } from '../../shared/model/jugador';
import { JugadorService } from '../../shared/service/jugador.service';
import { BorrarJugadorComponent } from '../borrar-jugador/borrar-jugador.component';

const cantidadDeJugadores = 10;
const NUMERO_INICIAL_DEFENSAS = 4;
const NUMERO_INCIAL_MEDIOCAMPISTAS = 4;
const NUMERO_INICIAL_DELANTEROS = 2;

const POSICION = 'Listar por posicion';
const PIE_HABIL = 'Listar por pie habil';
const CATEGORIA = 'Listar por categoria';
const LISTAR_TODOS = 'Listar todos';
const EQUIPO_ALEATORIO = 'Equipo aleatorio';
@Component({
  selector: 'app-listar-jugador',
  templateUrl: './listar-jugador.component.html',
  styleUrls: ['./listar-jugador.component.css']
})
export class ListarJugadorComponent implements OnInit {
  displayedColumns: string[] = ['documento', 'nombre', 'apellido', 'fechaNacimiento',
                                'peso', 'altura', 'posicion', 'acciones'];
  dataSource = new MatTableDataSource<Jugador>();
  panelOpenState = false;
  listaGeneral: string[] = ['Listar todos', 'Equipo aleatorio', 'Listar por posicion', 'Listar por pie habil', 
                          'Listar por categoria'];
  listaPosiciones: string[] = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];
  listaPieHabil: string[] = ['Derecho', 'Izquierdo'];
  listaJugadores: Jugador[];
  lista: number[];
  seleccionado: string;
  seleccionadoPosicion: string;
  seleccionadoPieHabil: string;
  seleccionadoCategoria: string;
  mostrarDatosPosicion = false;
  mostrarDatosPieHabil = false;
  mostrarDatosCategoria = false;

  defensas = NUMERO_INICIAL_DEFENSAS;
  mediocampistas = NUMERO_INCIAL_MEDIOCAMPISTAS;
  delanteros = NUMERO_INICIAL_DELANTEROS;
  cantidadEquipo = 0;

  @ViewChild(MatSort, { static : true }) sort: MatSort;

  constructor(protected jugadorService: JugadorService,
              private router: Router,
              public dialogo: MatDialog,
              protected mensajeService: MensajeService) { }

  ngOnInit(){
    this.elegirTipoDeLista(this.seleccionado);
    this.lista = this.jugadorService.listaDeAnios();
    this.jugadorService.consultar().subscribe(data => {
      this.listaJugadores = data;
    });
   }

  elegirTipoDeLista(bandera: string){
    this.filtro(bandera, new DtoPosiciones(this.defensas.toString(),
                         this.mediocampistas.toString(),
                         this.delanteros.toString()));
  }

  filtro(eleccion: string, dto: DtoPosiciones){
    if (eleccion === LISTAR_TODOS){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosCategoria = false;
      this.jugadorService.consultar().subscribe(data => {
        this.llenarDatasource(data);
      });
    } else if (eleccion === POSICION){
      this.mostrarDatosPosicion = true;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosCategoria = false;
      this.elegirPosicion(this.seleccionadoPosicion);
    } else if (eleccion === PIE_HABIL){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = true;
      this.mostrarDatosCategoria = false;
      this.elegirPieHabil(this.seleccionadoPieHabil);
    } else if (eleccion === CATEGORIA){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosCategoria = true;
      this.elegirCategoria(this.seleccionadoCategoria);
    } else if (eleccion === EQUIPO_ALEATORIO){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosCategoria = false;
      this.jugadorService.equipoAleatorio(dto.defensas, dto.mediocampistas, dto.delanteros).subscribe(data => {
        this.llenarDatasource(data);
      });
    }
    return this.listaJugadores;
  }

  elegirPosicion(value: string){
    return this.jugadorService.consultar().subscribe(data => {
      this.listaJugadores = data.filter(fitro => fitro.posicion === value);
      this.llenarDatasource(this.listaJugadores);
    });
  }

  elegirPieHabil(value: string){
    return this.jugadorService.consultar().subscribe(data => {
      this.listaJugadores = data.filter(filtro => filtro.pieHabil === value);
      this.llenarDatasource(this.listaJugadores);
    });
  }

  elegirCategoria(value: string){
    return this.jugadorService.listarPorCategoria(value).subscribe(data => {
      this.llenarDatasource(data);
    });
  }

  llenarDatasource(data: Jugador[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.listaJugadores = data;
    return this.listaJugadores;
  }

  restar(condicion: number){
    const inputDefensas = 1;
    const inputMediocampistas = 2;
    const inputDelanteros = 3;
    if (condicion === inputDefensas){
      this.cantidadEquipo = cantidadDeJugadores - this.mediocampistas - this.delanteros;
    }
    else if (condicion === inputMediocampistas){
      this.cantidadEquipo = cantidadDeJugadores - this.defensas - this.delanteros;
    }
    else if (condicion === inputDelanteros){
      this.cantidadEquipo = cantidadDeJugadores - this.mediocampistas - this.defensas;
    }
  }

  filtrar(){
    return this.jugadorService.consultar().subscribe(data => {
      this.listaJugadores = data.filter(fitro => 
        fitro.posicion === 'posicion');
    });
  }

  eliminar(id: number){
    this.jugadorService.eliminar(id).subscribe(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      this.mensajeService.openSnackBar('Jugador eliminado corretamente', 'Success');
    });
  }

  mostrarDialogo(id: number): void {
    this.dialogo
      .open(BorrarJugadorComponent, {
        data: `¿Deseas eliminar al jugador?`
      })
      .afterClosed()
      .subscribe((confirmado: boolean) => {
        if (confirmado) {
          this.eliminar(id);
          alert('¡Si!');
        } else {
          alert('Cancelar');
        }
      });
  }

}
