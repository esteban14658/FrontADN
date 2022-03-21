import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajeService } from '@shared/services/mensaje.service';
import { DtoPosiciones } from '../../shared/model/dtoPosiciones';
import { Jugador } from '../../../../shared/model/jugador';
import { JugadorService } from '../../shared/service/jugador.service';
import { BorrarJugadorComponent } from '../borrar-jugador/borrar-jugador.component';
import { PageEvent } from '@angular/material/paginator';

const cantidadDeJugadores = 10;
const NUMERO_INICIAL_DEFENSAS = 4;
const NUMERO_INCIAL_MEDIOCAMPISTAS = 4;
const NUMERO_INICIAL_DELANTEROS = 2;
const enum SeleccionGeneral{
  listarTodos = 'Listar todos',
  listarEquipo = 'Equipo aleatorio',
  listarPorPosicion = 'Listar por posicion',
  listarPorPieHabil = 'Listar por pie habil',
  listarPorCategoria = 'Listar por categoria'
}
const enum DespliegueDeColumnas{
  documento = 'documento',
  nombre = 'nombre',
  apellido = 'apellido',
  fechaNacimiento = 'fechaNacimiento',
  peso = 'peso',
  altura = 'altura',
  posicion = 'posicion',
  acciones = 'acciones'
}
const enum Posiciones{
  Portero = 'Portero',
  defensa = 'Defensa',
  Mediocampista = 'Mediocampista',
  delantero = 'Delantero'
}
const enum PieHabil{
  derecho = 'Derecho',
  izquierdo = 'Izquierdo'
}

const DOCIENTOS_REGISTROS = 200;
const PAGINA_CERO = 0;
const NUMERO_MAXIMO_REGISTROS = 1000;
const REGISTROS_INICIALES = 25;
@Component({
  selector: 'app-listar-jugador',
  templateUrl: './listar-jugador.component.html',
  styleUrls: ['./listar-jugador.component.css']
})
export class ListarJugadorComponent implements OnInit {
  displayedColumns: string[] = [DespliegueDeColumnas.documento, DespliegueDeColumnas.nombre, DespliegueDeColumnas.apellido,
                                DespliegueDeColumnas.fechaNacimiento, DespliegueDeColumnas.peso, DespliegueDeColumnas.altura,
                                DespliegueDeColumnas.posicion, DespliegueDeColumnas.acciones];
  dataSource = new MatTableDataSource<Jugador>();
  panelOpenState = false;
  listaGeneral: string[] = [SeleccionGeneral.listarTodos, SeleccionGeneral.listarEquipo, SeleccionGeneral.listarPorPosicion,
                            SeleccionGeneral.listarPorPieHabil, SeleccionGeneral.listarPorCategoria];
  listaPosiciones: string[] = [Posiciones.Portero, Posiciones.defensa, Posiciones.Mediocampista, Posiciones.delantero];
  listaPieHabil: string[] = [PieHabil.derecho, PieHabil.izquierdo];
  listaJugadores: Jugador[];
  lista: number[];
  seleccionado: string;
  seleccionadoPosicion: string;
  seleccionadoPieHabil: string;
  seleccionadoCategoria: string;
  mostrarDatosPosicion = false;
  mostrarDatosPieHabil = false;
  mostrarDatosCategoria = false;
  cantidad = REGISTROS_INICIALES;
  pageIndex = 0;
  pageSize = REGISTROS_INICIALES;

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
    this.jugadorService.consultar(this.pageSize, this.pageIndex).subscribe(data => {
      this.listaJugadores = data;
    });
   }

  elegirTipoDeLista(bandera: string){
    this.filtro(bandera, new DtoPosiciones(this.defensas.toString(),
                         this.mediocampistas.toString(),
                         this.delanteros.toString()));
  }

  filtro(eleccion: string, dto: DtoPosiciones){
    if (eleccion === SeleccionGeneral.listarTodos){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosCategoria = false;
      this.listarPaginado();
    } else if (eleccion === SeleccionGeneral.listarPorPosicion){
      this.mostrarDatosPosicion = true;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosCategoria = false;
      this.elegirPosicion(this.seleccionadoPosicion);
    } else if (eleccion === SeleccionGeneral.listarPorPieHabil){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = true;
      this.mostrarDatosCategoria = false;
      this.elegirPieHabil(this.seleccionadoPieHabil);
    } else if (eleccion === SeleccionGeneral.listarPorCategoria){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosCategoria = true;
      this.elegirCategoria(this.seleccionadoCategoria);
    } else if (eleccion === SeleccionGeneral.listarEquipo){
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
    return this.jugadorService.consultar(DOCIENTOS_REGISTROS, PAGINA_CERO).subscribe(data => {
      this.listaJugadores = data.filter(fitro => fitro.posicion === value);
      this.llenarDatasource(this.listaJugadores);
      this.cantidad = data.length;
    });
  }

  elegirPieHabil(value: string){
    return this.jugadorService.consultar(DOCIENTOS_REGISTROS, PAGINA_CERO).subscribe(data => {
      this.listaJugadores = data.filter(filtro => filtro.pieHabil === value);
      this.llenarDatasource(this.listaJugadores);
      this.cantidad = data.length;
    });
  }

  elegirCategoria(value: string){
    return this.jugadorService.listarPorCategoria(value).subscribe(data => {
      this.llenarDatasource(data);
      this.cantidad = data.length;
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
    return this.cantidadEquipo;
  }

  cambiarPagina(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    const dto = new DtoPosiciones(this.defensas.toString(),
                                  this.mediocampistas.toString(),
                                  this.delanteros.toString());
    this.filtro(this.seleccionado , dto);
  }

  listarPaginado(){
    this.obtenerMaximoRegistroDeDatos();
    this.jugadorService.consultar(this.pageSize, this.pageIndex).subscribe(data => {
      this.llenarDatasource(data);
    });
  }

  obtenerMaximoRegistroDeDatos(){
    this.jugadorService.consultar(NUMERO_MAXIMO_REGISTROS, 0).subscribe(data => {
      this.cantidad = data.length;
    });
  }

  eliminar(id: number){
    this.jugadorService.eliminar(id).subscribe(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      this.mensajeService.openSnackBar('Jugador eliminado corretamente', 'Success');
    });
    return true;
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
