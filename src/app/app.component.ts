import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapModule } from "./map/map.module";
import {SearchModule} from "./search/search.module";
import {ResultatModule} from "./resultat/resultat.module";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapModule,
    SearchModule,
    ResultatModule,
    // CommunicationModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crouservice';
}
