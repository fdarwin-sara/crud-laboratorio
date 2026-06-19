import { Routes } from '@angular/router';
import { SaraDashboardComponent } from './pages/sara-dashboard/sara-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sara/nuevo', pathMatch: 'full' },
  { path: 'sara/nuevo', component: SaraDashboardComponent },
  { path: 'sara/editar/:id', component: SaraDashboardComponent },
  { path: 'sara/listar', component: SaraDashboardComponent },
  { path: 'sara/eliminar', component: SaraDashboardComponent },
  { path: '**', redirectTo: 'sara/nuevo' }
];
