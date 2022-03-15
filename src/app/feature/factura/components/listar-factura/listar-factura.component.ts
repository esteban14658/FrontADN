import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Factura } from '../../shared/model/factura';
import { FacturaService } from '../../shared/service/factura.service';
import { BorrarFacturaComponent } from '../borrar-factura/borrar-factura.component';

@Component({
  selector: 'app-listar-factura',
  templateUrl: './listar-factura.component.html',
  styleUrls: ['./listar-factura.component.css']
})
export class ListarFacturaComponent implements OnInit {

  public listaFacturas: Observable<Factura[]>;
  listarFacturas: Factura[];

  @ViewChild(MatSort, { static : true }) sort: MatSort;
  displayedColumns: string[] = ['documento', 'nombre', 'apellido', 'fechaIngreso',
                                'fechaCaducidad', 'valor', 'acciones'];
  dataSource = new MatTableDataSource<Factura>();

  constructor(protected facturaService: FacturaService,
              protected router: Router,
              private snackBar: MatSnackBar,
              public dialogo: MatDialog) { }

  ngOnInit(){
    this.listaFacturas = this.facturaService.consultar();
    this.facturaService.consultar().subscribe(data => {
      this.listarFacturas = data;
    });
  }

  listar(){
    return this.facturaService.consultar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: number){
    console.log(id);
    this.facturaService.eliminar(id).subscribe(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      this.openSnackBar();
    });
  }

  openSnackBar() {
    this.snackBar.open('Factura eliminada correctamente', 'Success', {
      duration: 2000
    });
  }

  mostrarDialogo(id: number): void {
    console.log(id);
    this.dialogo
      .open(BorrarFacturaComponent, {
        data: `¿Deseas eliminar la factura?`
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
