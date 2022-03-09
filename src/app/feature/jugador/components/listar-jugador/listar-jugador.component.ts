import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Jugador } from '../../shared/model/jugador';
import { JugadorService } from '../../shared/service/jugador.service';

@Component({
  selector: 'app-listar-jugador',
  templateUrl: './listar-jugador.component.html',
  styleUrls: ['./listar-jugador.component.css']
})
export class ListarJugadorComponent implements OnInit {
  displayedColumns: string[] = ['documento', 'nombre', 'apellido', 'fechaNacimiento', 
                                'peso', 'altura', 'posicion'];
  dataSource = new MatTableDataSource<Jugador>()

  panelOpenState = false;

  public listaJugadores: Observable<Jugador[]>;
  listaGeneral:string[]=["Listar todos", "Equipo aleatorio", "Listar por posicion", "Listar por pie habil"];
  listaPosiciones:string[]=["Portero", "Defensa", "Mediocampista", "Delantero"];
  listaPieHabil:string[]=["Derecho", "Izquierdo"];
  seleccionado: string;
  seleccionadoPosicion: string;
  seleccionadoPieHabil: string;
  mostrarDatosPosicion: Boolean;
  mostrarDatosPieHabil: Boolean;

  valor1 = 4;
  valor2 = 4;
  valor3 = 2;
  cantidadEquipo = 0;

  @ViewChild(MatSort, { static : true }) sort: MatSort;

  constructor(protected jugadorService: JugadorService) { }

  ngOnInit(){
    this.elegirTipoDeLista(this.seleccionado);
    console.log(this.seleccionado);    
  }

  elegirTipoDeLista(bandera: string){
    console.log(this.seleccionado);
    if (bandera === "Listar todos"){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      return this.jugadorService.consultar().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
    } else if (bandera === "Equipo aleatorio"){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      return this.jugadorService.equipoAleatorio(this.valor1.toString(), 
      this.valor2.toString(), this.valor3.toString()).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
    } else if (bandera === "Listar por posicion"){
      this.mostrarDatosPosicion = true;
      this.mostrarDatosPieHabil = false;
      return this.elegirPosicion(this.seleccionadoPosicion);
    } else if (bandera === "Listar por pie habil"){
      this.mostrarDatosPieHabil = true;
      this.mostrarDatosPosicion = false;
      return this.elegirPieHabil(this.seleccionadoPieHabil);
    } else {
      console.log("No permitido");
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

  restar(condicion: number){
    if (condicion === 1){
      this.cantidadEquipo = 10 - this.valor2 - this.valor3;
    }
    else if (condicion === 2){
      this.cantidadEquipo = 10 - this.valor1 - this.valor3;
    }
    else if (condicion === 3){
      this.cantidadEquipo = 10 - this.valor2 - this.valor1;
    }
  }

  alineacion(){

  }

}
