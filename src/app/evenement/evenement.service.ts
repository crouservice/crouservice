import {EventEmitter, Injectable, Output} from '@angular/core';
import {LatLng, LatLngBounds} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  @Output() majFiltreEvent: EventEmitter<VoidFunction> = new EventEmitter<VoidFunction>();
  @Output() majLocationEvent: EventEmitter<LatLngBounds> = new EventEmitter<LatLngBounds>();
  @Output() gotoEvent: EventEmitter<LatLng> = new EventEmitter<LatLng>();

  majFiltre() {
    this.majFiltreEvent.emit();
  }

  majLocation(location: LatLngBounds) {
    this.majLocationEvent.emit(location);
  }

  goto(location: LatLng) {
    this.gotoEvent.emit(location);
  }
}
