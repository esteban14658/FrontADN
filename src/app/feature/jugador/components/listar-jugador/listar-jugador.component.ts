import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajeService } from '@core/services/mensaje.service';
import { Jugador } from '../../shared/model/jugador';
import { JugadorService } from '../../shared/service/jugador.service';
import { BorrarJugadorComponent } from '../borrar-jugador/borrar-jugador.component';

const cantidadDeJugadores = 10;
@Component({
  selector: 'app-listar-jugador',
  templateUrl: './listar-jugador.component.html',
  styleUrls: ['./listar-jugador.component.css']
})
export class ListarJugadorComponent implements OnInit {
  public listaJugadores: Jugador[];
  displayedColumns: string[] = ['documento', 'nombre', 'apellido', 'fechaNacimiento', 
                                'peso', 'altura', 'posicion', 'acciones'];
  dataSource = new MatTableDataSource<Jugador>()

  panelOpenState = false;


  listaGeneral:string[]=["Listar todos", "Equipo aleatorio", "Listar por posicion", "Listar por pie habil", 
                          "Listar por categoria"];
  listaPosiciones:string[]=["Portero", "Defensa", "Mediocampista", "Delantero"];
  listaPieHabil:string[]=["Derecho", "Izquierdo"];
  lista: number[];
  seleccionado: string;
  seleccionadoPosicion: string;
  seleccionadoPieHabil: string;
  seleccionadoCategoria: string;
  mostrarDatosPosicion: Boolean = false;
  mostrarDatosPieHabil: Boolean = false;
  mostrarDatosCategoria: Boolean = false;

  defensas = 4;
  mediocampistas = 4;
  delanteros = 2;
  cantidadEquipo = 0;

  anioInicial = 1990;

  @ViewChild(MatSort, { static : true }) sort: MatSort;

  constructor(protected jugadorService: JugadorService, 
              private router: Router,
              public dialogo: MatDialog, 
              protected mensajeService: MensajeService) { }

  ngOnInit(){
    this.elegirTipoDeLista(this.seleccionado);
    this.jugadorService.consultar().subscribe(data => {
      this.listaJugadores = data;
    });
    this.lista = this.jugadorService.listaDeAnios();
   }

  elegirTipoDeLista(bandera: string){
    if (bandera === "Listar todos"){
      this.mostrarDatosCategoria = false;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosPosicion = false;
      return this.jugadorService.consultar().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
    } else if (bandera === "Equipo aleatorio"){
      this.mostrarDatosCategoria = false;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosPosicion = false;
      return this.jugadorService.equipoAleatorio(this.defensas.toString(), 
      this.mediocampistas.toString(), this.delanteros.toString()).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
    } else if (bandera === "Listar por posicion"){
      this.mostrarDatosCategoria = false;
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosPosicion = true;
      return this.elegirPosicion(this.seleccionadoPosicion);
    } else if (bandera === "Listar por pie habil"){
      this.mostrarDatosCategoria = false;
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = true;
      return this.elegirPieHabil(this.seleccionadoPieHabil);
    } else if (bandera === "Listar por categoria"){
      this.mostrarDatosPieHabil = false;
      this.mostrarDatosPosicion = false;
      this.mostrarDatosCategoria = true;
      return this.elegirCategoria(this.seleccionadoCategoria);
    }
  }

  elegirPosicion(value: any){
    this.seleccionadoPosicion = value;
    return this.jugadorService.listarPorPosicion(value).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  elegirPieHabil(value: any){
    this.seleccionadoPieHabil = value;
    return this.jugadorService.listarPorPieHabil(value).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  elegirCategoria(value: any){
    this.seleccionadoCategoria = value;
    return this.jugadorService.listarPorCategoria(value).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  restar(condicion: number){
    if (condicion === 1){
      this.cantidadEquipo = cantidadDeJugadores - this.mediocampistas - this.delanteros;
    }
    else if (condicion === 2){
      this.cantidadEquipo = cantidadDeJugadores - this.defensas - this.delanteros;
    }
    else if (condicion === 3){
      this.cantidadEquipo = cantidadDeJugadores - this.mediocampistas - this.defensas;
    }
  }

  eliminar(id: number){
    console.log(id);
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
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminar(id);
          alert("¡Si!");
        } else {
          alert("Cancelar");
        }
      });
  }

}
