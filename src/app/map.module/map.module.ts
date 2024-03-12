import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from "../map.component/map.component";


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
