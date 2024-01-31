import {Component, OnInit} from '@angular/core';

import * as leaf from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  ngOnInit() {
    const map = leaf.map('map');
    map.on('zoomend', this.updateLocation);
    map.on('moveend', this.updateLocation);
    map.on('overlayadd', this.updateFilter);
    map.on('overlayremove', this.updateFilter);

    leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

//    this.getLocation((position: GeolocationPosition) => {
//      map.setView([position.coords.latitude, position.coords.longitude], 20);
//    });

    let restaurant = leaf.layerGroup();
    leaf.marker([48.015357681471045, 0.16513664872329234]).addTo(restaurant).bindPopup('Vaurouzé');
    leaf.marker([48.017760514741795, 0.1539500722304242]).addTo(restaurant).bindPopup('Bartholdi');
    restaurant.addTo(map);

    let hebergement = leaf.layerGroup()
    leaf.marker([48.015991645087695, 0.16614303253937102]).addTo(hebergement).bindPopup('Vaurouzé');
    leaf.marker([48.01841058775789, 0.1537444306787454]).addTo(hebergement).bindPopup('Bartholdi');
    hebergement.addTo(map);

    leaf.control.layers({},
      {
        'Restaurants': restaurant,
        'Hébergement': hebergement
      }).addTo(map);
  }

  getLocation(success: PositionCallback, error?: PositionErrorCallback | null) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  updateLocation() {
    console.log("#TODO update location")
  }

  updateFilter() {
    console.log("#TODO update filter")
  }
}
