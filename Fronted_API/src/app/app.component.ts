import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SaraMenuComponent } from './components/sara-menu/sara-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SaraMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Fronted_API';
}
