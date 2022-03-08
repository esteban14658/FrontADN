import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../../shared/model/jugador';
import { JugadorService } from '../../shared/service/jugador.service';

@Component({
  selector: 'app-listar-jugador',
  templateUrl: './listar-jugador.component.html',
  styleUrls: ['./listar-jugador.component.css']
})
export class ListarJugadorComponent implements OnInit {
  public listaJugadores: Observable<Jugador[]>;
  listaGeneral:string[]=["Listar todos", "Equipo aleatorio", "Listar por posicion", "Listar por pie habil"];
  listaPosiciones:string[]=["Portero", "Defensa", "Mediocampista", "Delantero"];
  listaPieHabil:string[]=["Derecho", "Izquierdo"];
  seleccionado: string;
  seleccionadoPosicion: string;
  seleccionadoPieHabil: string;
  mostrarDatosPosicion: Boolean;
  mostrarDatosPieHabil: Boolean;

  constructor(protected jugadorService: JugadorService) { }

  ngOnInit(){
    this.elegirTipoDeLista(this.seleccionado);
  }

  elegirTipoDeLista(bandera: string){
    if (bandera === "Listar todos"){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      return this.listaJugadores = this.jugadorService.consultar();
    } else if (bandera === "Equipo aleatorio"){
      this.mostrarDatosPosicion = false;
      this.mostrarDatosPieHabil = false;
      return this.listaJugadores = this.jugadorService.equipoAleatorio();
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
    return this.listaJugadores = this.jugadorService.listarPorPosicion(value);
  }

  elegirPieHabil(value: any){
    this.seleccionadoPieHabil = value;
    return this.listaJugadores = this.jugadorService.listarPorPieHabil(value);
  }

}
