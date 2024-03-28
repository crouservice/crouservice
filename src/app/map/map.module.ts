import {EventEmitter, NgModule, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from "./components/map/map.component";
import {ApiService} from "../api/api.service";



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
