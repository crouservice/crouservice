import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapModule} from "./map.module/map.module";
import { SearchComponent } from './search/search.component';
import { BarreVertComponent } from './barre-vert/barre-vert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
    RouterOutlet,
    MapModule,
    SearchComponent, 
    BarreVertComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crouservice';
}
