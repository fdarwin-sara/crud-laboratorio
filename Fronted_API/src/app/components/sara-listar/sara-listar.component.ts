import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Microscopio } from '../../models/microscopio.model';

@Component({
  selector: 'app-sara-listar',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './sara-listar.component.html',
  styleUrl: './sara-listar.component.scss'
})
export class SaraListarComponent implements AfterViewInit {
  @Input() set lista(microscopios: Microscopio[]) {
    this.microscopios = microscopios;
    this.dataSource.data = microscopios;
  }

  @Output() microscopioEliminado = new EventEmitter<number>();

  microscopios: Microscopio[] = [];

  displayedColumns = ['id', 'codigo', 'marca', 'precio', 'fechaFabricacion', 'estado-2', 'acciones'];
  dataSource = new MatTableDataSource<Microscopio>();

  private router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  editar(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/sara/editar', id]);
    }
  }

  eliminar(id?: number): void {
    if (id) {
      this.microscopioEliminado.emit(id);
    }
  }
}
