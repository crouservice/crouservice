import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapModule } from "./map.module/map.module";
import {  CommunicationModule } from './communication/communication.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapModule,
    CommunicationModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crouservice';
}
