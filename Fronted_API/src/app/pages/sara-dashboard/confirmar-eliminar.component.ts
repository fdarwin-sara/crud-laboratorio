import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-eliminar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './confirmar-eliminar.component.html',
  styleUrl: './confirmar-eliminar.component.scss'
})
export class ConfirmarEliminarComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmarEliminarComponent>) {}

  aceptar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
