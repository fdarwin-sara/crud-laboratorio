import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Microscopio } from '../../models/microscopio.model';
import { MicroscopioService } from '../../services/microscopio.service';
import { SaraCrearComponent } from '../../components/sara-crear/sara-crear.component';
import { SaraListarComponent } from '../../components/sara-listar/sara-listar.component';
import { SaraEliminarComponent } from '../../components/sara-eliminar/sara-eliminar.component';
import { ConfirmarEliminarComponent } from './confirmar-eliminar.component';

@Component({
  selector: 'app-sara-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SaraCrearComponent,
    SaraListarComponent,
    SaraEliminarComponent,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './sara-dashboard.component.html',
  styleUrl: './sara-dashboard.component.scss'
})
export class SaraDashboardComponent implements OnInit {
  microscopios: Microscopio[] = [];
  routeUrl = '';
  microscopioParaEditar?: Microscopio;

  constructor(
    private microscopioService: MicroscopioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeUrl = this.router.url;
    this.verificarEdicion(this.routeUrl);

    this.router.events.subscribe((evento) => {
      if (evento instanceof NavigationEnd) {
        this.routeUrl = evento.urlAfterRedirects;
        this.verificarEdicion(this.routeUrl);
      }
    });
    this.listar();
  }

  verificarEdicion(url: string): void {
    if (url.includes('/sara/editar/')) {
      const partes = url.split('/');
      const id = Number(partes[partes.length - 1]);
      if (!isNaN(id)) {
        this.microscopioService.obtenerPorId(id).subscribe({
          next: (data) => {
            this.microscopioParaEditar = data;
          },
          error: () => {
            this.snackBar.open('No se pudo cargar el microscopio para editar', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/sara/listar']);
          }
        });
      }
    } else {
      this.microscopioParaEditar = undefined;
    }
  }

  listar(): void {
    this.microscopioService.listar().subscribe({
      next: (data) => {
        this.microscopios = data;
      },
      error: () => {
        this.snackBar.open('No se pudo cargar microscopios del backend', 'Cerrar', { duration: 3000 });
      }
    });
  }

  crear(microscopio: Microscopio): void {
    this.microscopioService.crear(microscopio).subscribe({
      next: () => {
        this.snackBar.open('Microscopio registrado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/sara/listar']);
        this.routeUrl = '/sara/listar';
        this.listar();
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'No se pudo registrar el microscopio';
        this.snackBar.open(errorMsg, 'Cerrar', { duration: 5000 });
      }
    });
  }

  actualizar(microscopio: Microscopio): void {
    if (microscopio.id) {
      this.microscopioService.actualizar(microscopio.id, microscopio).subscribe({
        next: () => {
          this.snackBar.open('Microscopio actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/sara/listar']);
          this.routeUrl = '/sara/listar';
          this.listar();
        },
        error: (err) => {
          const errorMsg = err.error?.message || 'No se pudo actualizar el microscopio';
          this.snackBar.open(errorMsg, 'Cerrar', { duration: 5000 });
        }
      });
    }
  }

  solicitarEliminar(id: number): void {
    const referencia = this.dialog.open(ConfirmarEliminarComponent, {
      width: '320px'
    });

    referencia.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) {
        return;
      }

      this.eliminar(id);
    });
  }

  eliminar(id: number): void {
    this.microscopioService.eliminar(id).subscribe({
      next: () => {
        this.snackBar.open('Microscopio eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/sara/listar']);
        this.routeUrl = '/sara/listar';
        this.listar();
      },
      error: () => {
        this.snackBar.open('No se pudo eliminar el microscopio', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
