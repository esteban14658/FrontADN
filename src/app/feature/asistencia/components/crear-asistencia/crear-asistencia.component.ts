import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Jugador } from '@shared/model/jugador';
import { Asistencia } from '../../shared/model/asistencia';
import { AsistenciaService } from '../../shared/service/asistencia.service';

@Component({
  selector: 'app-crear-asistencia',
  templateUrl: './crear-asistencia.component.html',
  styleUrls: ['./crear-asistencia.component.css']
})
export class CrearAsistenciaComponent implements OnInit {

  @Output() addRequest = new EventEmitter<Jugador>();

  listaJugadores: Jugador[];
  listaDeId: number[] = [];

  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  jugador: Jugador = new Jugador(1);
  asistencia: Asistencia = new Asistencia(0, this.myDate, this.jugador);
  displayedColumns: string[] = ['select', 'documento', 'nombre', 'apellido', 'fechaNacimiento',
                                'peso', 'altura', 'posicion'];
  dataSource = new MatTableDataSource<Jugador>();
  selection = new SelectionModel<Jugador>(true, []);

  @ViewChild(MatSort, { static : true }) sort: MatSort;

  constructor(protected asistenciaService: AsistenciaService,
              protected router: Router) { }

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
    return this.asistenciaService.listarJugadoresSinAsistencia().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.listaJugadores = data;

    });
  }

  agregar(){
    this.listaDeId.forEach(x => {
      this.asistencia.jugador.id = x;
      this.asistenciaService.guardar(this.asistencia).subscribe(() => {
      });
    });
    this.router.navigateByUrl('/home', { replaceUrl: true });
    return true;
  }

  showOptions(event: MatCheckboxChange, id: number) {
    if (event.checked === true){
      this.listaDeId.push(id);
    } else {
      this.listaDeId.forEach((element, index) => {
        if (element === id) {
          this.listaDeId.splice(index, 1);
        }
      });
    }
  }

  showsOptions(event: MatCheckboxChange): void {
    this.listaDeId = [];
    this.masterToggle();
    if (event.checked === true){
      this.dataSource.data.forEach(x => {
        this.listaDeId.push(x.id);
      });
    } else {
      this.listaDeId = [];
    }
  }

}
