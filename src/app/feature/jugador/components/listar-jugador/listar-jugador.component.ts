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
  listaPosiciones:string[]=["Portero", "Defensa", "Mediocampista", "Delantero"];
  seleccionado: string;

  constructor(protected jugadorService: JugadorService) { }

  ngOnInit(){
    this.elegirTipoDeLista(3);
  }

  elegirTipoDeLista(bandera: number){
    if (bandera === 1){
      return this.listaJugadores = this.jugadorService.consultar();
    } else if (bandera === 2){
      return this.listaJugadores = this.jugadorService.equipoAleatorio();
    } else if (bandera === 3){
      return this.elegirPosicion(this.seleccionado);
    } else if (bandera === 4){
      return this.listaJugadores = this.jugadorService.listarPorPieHabil("");
    } else {
      console.log("No permitido");
    }
  }

  elegirPosicion(value: any){
    this.seleccionado = value;
    return this.listaJugadores = this.jugadorService.listarPorPosicion(value);
  }

}
