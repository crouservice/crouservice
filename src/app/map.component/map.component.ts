import {Component, OnInit} from '@angular/core';

import * as leaf from 'leaflet';
import {MapModule} from "../map.module/map.module";
import {ApiMapService} from "../service/api-map.service";
import {Icon, LatLng, Layer, LayerGroup} from "leaflet";


interface Logement {
  title: string;
  geocalisation: {
    lat: number;
    lon: number;
  };
}

interface Restaurant {
  title: string;
  geolocalisation: {
    lat: number;
    lon: number;
  };
}
interface Universite {
  uo_lib: string;
  coordonnees: {
    lat: number;
    lon: number;
  };
}

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  constructor(private api: ApiMapService) {}

  listeHebergement: any = [];
  restaurantIcon: Icon = leaf.icon({
    iconUrl: 'assets/maps/restaurant.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
  hebergementIcon: Icon = leaf.icon({
    iconUrl: 'assets/maps/hebergement.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
  universiteIcon: Icon = leaf.icon({
    iconUrl: 'assets/maps/universite.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  hebergementLayer: LayerGroup = leaf.layerGroup();
  restaurantLayer: LayerGroup = leaf.layerGroup();
  universiteLayer: LayerGroup = leaf.layerGroup();

  ngOnInit() {
//    this.getHebergementLocation()
/*    const universiteIcon = leaf.icon(
      iconUrl: 'assets/maps/universite.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    );*/
    const map = leaf.map('map').setView([48.01850, 0.160995], 15);
    map.on('zoomend', _ => this.updateLocation(this.api, map));
    map.on('moveend', _ => this.updateLocation(this.api, map));
    map.on('overlayadd', this.updateFilter);
    map.on('overlayremove', this.updateFilter);
    map.locate();

    leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);


//    this.listeHebergement.forEach((location: Location) => {
//      console.log(location);
//      leaf.marker([location["localisation"]["lat"], location["localisation"]["lng"]], {icon: hebergementIcon}).addTo(hebergement).bindPopup(location["label"]);
//    });
/*    this.api.GetLocalisation()
      .subscribe((data: Object) => {
        (data as Location[]).forEach((location: Location) => {
          leaf.marker([location["localisation"]["lat"], location["localisation"]["lon"]], {icon: this.hebergementIcon}).addTo(this.hebergementLayer).bindPopup(location["label"]);
          console.log(location);
        });
      });*/
    this.updateLocation(this.api, map);
    this.hebergementLayer.addTo(map);
    this.restaurantLayer.addTo(map);

    this.api.getUniversites().subscribe((data: Object) => {
      (data as Universite[]).forEach((universite: Universite) => {
        leaf.marker([universite.coordonnees.lat, universite.coordonnees.lon], {icon: this.universiteIcon})
          .addTo(this.universiteLayer)
          .bindPopup(universite.uo_lib);
      });
    });
    this.universiteLayer.addTo(map);

    leaf.control.layers({}, {'Restaurants': this.restaurantLayer, 'Hébergement': this.hebergementLayer}).addTo(map);
  }

  updateLocation(api: ApiMapService, map: leaf.Map) {
    api.getLogements(map.getBounds())
      .subscribe((data: Object) => {
        if (data == undefined) {
          return;
        }
        (data as Logement[]).forEach((location: Logement) => {
          if (this.hebergementLayer.getLayers().length == 0 || !this.hebergementLayer.getLayers().map(layer => layer.getTooltip()?.getLatLng()).includes(new LatLng(location["geocalisation"]["lat"], location["geocalisation"]["lon"]))) {
            //console.log(location);
            leaf.marker([location.geocalisation.lat, location.geocalisation.lon], {icon: this.hebergementIcon})
              .addTo(this.hebergementLayer)
              .bindPopup(location.title);
          }
        });
      });
    api.getRestaurants(map.getBounds())
      .subscribe((data: Object) => {
        if (data == undefined) {
          return;
        }
        (data as Restaurant[]).forEach((restaurant: Restaurant) => {
          leaf.marker([restaurant.geolocalisation.lat, restaurant.geolocalisation.lon], {icon: this.restaurantIcon})
            .addTo(this.restaurantLayer)
            .bindPopup(restaurant.title);
        });
      });
  }

  updateFilter() {
    //console.log("#TODO update filter")
  }
}
