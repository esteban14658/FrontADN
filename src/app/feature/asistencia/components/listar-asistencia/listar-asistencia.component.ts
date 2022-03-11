import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Jugador } from 'src/app/feature/jugador/shared/model/jugador';
import { JugadorService } from 'src/app/feature/jugador/shared/service/jugador.service';
import { AsistenciaService } from '../../shared/service/asistencia.service';

@Component({
  selector: 'app-listar-asistencia',
  templateUrl: './listar-asistencia.component.html',
  styleUrls: ['./listar-asistencia.component.css']
})
export class ListarAsistenciaComponent implements OnInit {

  listaJugadores: Observable<Jugador[]>;

  displayedColumns: string[] = ['select', 'documento', 'nombre', 'apellido', 'fechaNacimiento', 
                                'peso', 'altura', 'posicion'];
  dataSource = new MatTableDataSource<Jugador>();
  selection = new SelectionModel<Jugador>(true, []);

  @ViewChild(MatSort, { static : true }) sort: MatSort;

  constructor(protected asistenciaService: AsistenciaService,
              protected jugadorService: JugadorService) { }

  ngOnInit(){
    this.listarJugadores();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  listarJugadores(){
    this.jugadorService.listarJugadoresSinAsistencia().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

}
