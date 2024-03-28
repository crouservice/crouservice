import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../api/api.service";
import * as leaf from "leaflet";
import {Icon, LatLng, LayerGroup} from "leaflet";
import {EvenementService} from "../../../evenement/evenement.service";

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
  constructor(private api: ApiService, private event: EvenementService) {
  }

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

  ngOnInit(): void {
    const map = leaf.map('map').setView([48.01850, 0.160995], 15);
    map.on("zoomend", _ => this.updateLocation(this.event, this.api, map));
    map.on("moveend", _ => this.updateLocation(this.event, this.api, map));
    map.on("overlayadd", this.updateFilter);
    map.on("overlayremove", this.updateFilter);
    map.locate();

    leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    this.updateLocation(this.event, this.api, map);
    this.hebergementLayer.addTo(map);
    this.restaurantLayer.addTo(map);

    this.api.getUniversites().subscribe((universites: any) => {
      for (const universite of (universites as Universite[])) {
        leaf.marker([universite.coordonnees.lat, universite.coordonnees.lon], {icon: this.universiteIcon})
          .bindPopup(universite.uo_lib)
          .addTo(this.universiteLayer);
      }
    });
    this.universiteLayer.addTo(map);

    leaf.control.layers({}, {
      "Hebergement": this.hebergementLayer,
      "Restaurant": this.restaurantLayer,
      "Universite": this.universiteLayer
    }).addTo(map);

    this.event.majFiltreEvent.subscribe(() => {
      this.hebergementLayer.clearLayers();
      this.restaurantLayer.clearLayers();
      this.updateLocation(this.event, this.api, map);
    })
    this.event.gotoEvent.subscribe((latlng: LatLng) => {
      map.setView(latlng, 20);
      this.event.majLocation(map.getBounds());
    });
  }

  /**
   * Mise à jour des lieux
   * @param event Evenement
   * @param api API
   * @param map Carte
   */
  updateLocation(event: EvenementService, api: ApiService, map: leaf.Map): void {
    const bounds = map.getBounds();
    event.majLocation(bounds);
    api.getLogements(bounds).subscribe((logements: any) => {
      for (const logement of (logements as Logement[])) {
        if (this.hebergementLayer.getLayers().length == 0 || !this.hebergementLayer.getLayers().map(layer => layer.getTooltip()?.getLatLng()).includes(new LatLng(logement.geocalisation.lat, logement.geocalisation.lon))) {
          leaf.marker([logement.geocalisation.lat, logement.geocalisation.lon], {icon: this.hebergementIcon})
            .bindPopup(logement.title)
            .addTo(this.hebergementLayer);
        }
      }
    });
    api.getRestaurants(bounds).subscribe((restaurants: any) => {
      for (const restaurant of (restaurants as Restaurant[])) {
        if (this.restaurantLayer.getLayers().length == 0 || !this.restaurantLayer.getLayers().map(layer => layer.getTooltip()?.getLatLng()).includes(new LatLng(restaurant.geolocalisation.lat, restaurant.geolocalisation.lon))) {
          leaf.marker([restaurant.geolocalisation.lat, restaurant.geolocalisation.lon], {icon: this.restaurantIcon})
            .bindPopup(restaurant.title)
            .addTo(this.restaurantLayer);
        }
      }
    });
  }

  /**
   * Mise à jour des filtres
   */
  updateFilter(): void {
  }
}
