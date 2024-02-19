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
    const restaurantIcon = leaf.icon({
      iconUrl: 'assets/maps/restaurant.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
    const hebergementIcon = leaf.icon({
      iconUrl: 'assets/maps/hebergement.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
    const map = leaf.map('map').setView([48.01850, 0.160995], 15);
    map.on('zoomend', this.updateLocation);
    map.on('moveend', this.updateLocation);
    map.on('overlayadd', this.updateFilter);
    map.on('overlayremove', this.updateFilter);
    map.locate();

    leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let restaurant = leaf.layerGroup();
    this.getRestaurantLocation().forEach(location => {
      leaf.marker([location.lat, location.lng], {icon: restaurantIcon}).addTo(restaurant).bindPopup(location.label);
    });
    restaurant.addTo(map);

    let hebergement = leaf.layerGroup();
    this.getHebergementLocation().forEach(location => {
      leaf.marker([location.lat, location.lng], {icon: hebergementIcon}).addTo(hebergement).bindPopup(location.label);
    });
    hebergement.addTo(map);

    leaf.control.layers({}, {'Restaurants': restaurant, 'Hébergement': hebergement}).addTo(map);
  }

  updateLocation() {
    console.log("#TODO update location")
  }

  updateFilter() {
    console.log("#TODO update filter")
  }

  getHebergementLocation() {
    console.log("#TODO get hebergement location")
    return [
      {label: "Vaurouzé", lat: 48.015991645087695, lng: 0.16614303253937102},
      {label: "Bartholdi", lat: 48.01841058775789, lng: 0.1537444306787454}
    ]
  }

  getRestaurantLocation() {
    console.log("#TODO get restaurant location")
    return [
      {label: "Vaurouzé", lat: 48.015357681471045, lng: 0.16513664872329234},
      {label: "Bartholdi", lat: 48.017760514741795, lng: 0.1539500722304242}
    ]
  }
}
