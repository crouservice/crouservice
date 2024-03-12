import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapModule} from "./map.module/map.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crouservice';
}
