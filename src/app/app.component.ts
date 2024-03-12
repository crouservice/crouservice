import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarreVerticaleSearchModule } from './barre-verticale-search/barre-verticale-search.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BarreVerticaleSearchModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crousfront';
}

