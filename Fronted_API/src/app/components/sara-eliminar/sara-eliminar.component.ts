import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Microscopio } from '../../models/microscopio.model';

@Component({
  selector: 'app-sara-eliminar',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './sara-eliminar.component.html',
  styleUrl: './sara-eliminar.component.scss'
})
export class SaraEliminarComponent implements AfterViewInit {
  @Input() set lista(microscopios: Microscopio[]) {
    this.microscopios = microscopios;
    this.dataSource.data = microscopios;
  }

  @Output() microscopioEliminado = new EventEmitter<number>();

  microscopios: Microscopio[] = [];

  displayedColumns = ['id', 'codigo', 'marca', 'precio', 'fechaFabricacion', 'estado-2', 'acciones'];
  dataSource = new MatTableDataSource<Microscopio>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id?: number): void {
    if (id) {
      this.microscopioEliminado.emit(id);
    }
  }
}
