import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from "../map.component/map.component";
import {ApiMapService} from "../service/api-map.service";


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiMapService
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
