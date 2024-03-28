import {EventEmitter, Injectable, Output} from '@angular/core';
import {LatLng, LatLngBounds} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  @Output() majFiltreEvent: EventEmitter<VoidFunction> = new EventEmitter<VoidFunction>();
  @Output() majLocationEvent: EventEmitter<LatLngBounds> = new EventEmitter<LatLngBounds>();
  @Output() gotoEvent: EventEmitter<LatLng> = new EventEmitter<LatLng>();

  /**
   * Mise à jour du filtre
   */
  majFiltre() {
    this.majFiltreEvent.emit();
  }

  /**
   * Mise à jour de la localisation
   * @param location Nouvelle localisation
   */
  majLocation(location: LatLngBounds) {
    this.majLocationEvent.emit(location);
  }

  /**
   * Déplacement de la carte
   * @param location Nouvelle position
   */
  goto(location: LatLng) {
    this.gotoEvent.emit(location);
  }
}
