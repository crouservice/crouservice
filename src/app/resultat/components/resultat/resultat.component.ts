import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {bounds, LatLng, LatLngBounds} from "leaflet";
import {ApiService} from "../../../api/api.service";
import {EvenementService} from "../../../evenement/evenement.service";

interface Logement {
  id: number;
  title: string;
  short_desc: string;
  zone: string;
  infos: string;
  services: string;
  contact: string;
  address: string;
  mail: string;
  phone: string;
  openinghours: string;
  interneturl: string;
  appointementurl: string;
  virtualvisiturl: string;
  crousandgourl: string;
  albumurl: string;
  troubleshooting: string;
  house_services: string;
  images: string;
  geocalisation: {
    lat: number;
    lon: number;
  };
  photo: string;
  regions: string;
}

interface Restaurant {
  type: string;
  zone: string;
  title: string;
  short_desc: string;
  id: string;
  contact: string;
  lat: number;
  infos: string;
  closing: number;
  geolocalisation: {
    lat: number;
    lon: number;
  };
  photo: string;
}

@Component({
  selector: 'app-resultat',
  standalone: false,
  templateUrl: './resultat.component.html',
  styleUrl: './resultat.component.css'
})
export class ResultatComponent implements OnInit {
  private dim: LatLngBounds | null = null;

  constructor(private service: ApiService, private event: EvenementService) {
    event.majLocationEvent.subscribe((dim: LatLngBounds) => {
      this.dim = dim;
      let place = document.getElementById("placeItems");
      if (place == null) {
        return;
      }
      place.innerHTML = '';
      this.creationLogements(place, service);
      this.creationRestaurants(place, service);
    });
    event.majFiltreEvent.subscribe(() => {
      let place = document.getElementById("placeItems");
      if (place == null) {
        return;
      }
      place.innerHTML = '';
      this.creationLogements(place, service);
      this.creationRestaurants(place, service);
    });
  }

  ngOnInit(): void {
    let place = document.getElementById("placeItems");
    if (place != null) {
      setTimeout(() => this.creationRestaurants(place, this.service), 10);
      setTimeout(() => this.creationLogements(place, this.service), 10);
    }
  }

  /**
   * Mise à jour de la zone de recherche
   * @param nomFiltre Nom du filtre
   */
  filtres(nomFiltre: string): void {
    this.service.filtres(nomFiltre, this.dim);
    this.event.majFiltre();
  }

  /**
   * Création des éléments restaurants
   * @param place Element parent
   * @param service Service API
   */
  creationRestaurants(place: HTMLElement | null, service: ApiService): void {
    if (place == null) {
      return;
    }
    service.getRestaurants(this.dim).subscribe((elements: any) => {
      for (const el of (elements as Restaurant[])) {
        if (el != undefined) {
          const div = document.createElement("div");
          div.className = 'item';
          let baseCss = 'padding: 5px; border-bottom: 1px solid black; background-color: #820E06;';
          div.style.cssText = baseCss
          div.onmouseover = () => {
            div.style.cssText = baseCss+'background-color: #EF5D4E; color: white; cursor: pointer;'
          }
          div.onmouseout = () => {
            div.style.cssText = baseCss
          }
          div.onclick = () => {
            this.event.goto(new LatLng(el.geolocalisation.lat, el.geolocalisation.lon))
          }

          const titre = document.createElement("p");
          titre.innerText = el.title;
          titre.style.cssText = `font-weight: bold; color: #E3E3E0;`

          const lieu = document.createElement("p");
          lieu.innerText = el.zone;
          lieu.style.cssText = `font-weight: italic; color: #E3E3E0;`

          const description = document.createElement("p");
          description.innerText = el.infos;
          description.style.cssText = `font-size: smaller; color: #E3E3E0;`

          div.appendChild(titre);
          div.appendChild(lieu);
          div.appendChild(description);
          place?.appendChild(div);
        }
      }
    })
  }

  /**
   * Création des éléments logements
   * @param place Element parent
   * @param service Service API
   */
  creationLogements(place: HTMLElement | null, service: ApiService): void {
    if (place == null) {
      return;
    }
    service.getLogements(this.dim).subscribe((elements: any) => {
      for (const el of (elements as Logement[])) {
        if (el != undefined) {
          const div = document.createElement("div");
          div.className = 'item';
          let baseCss = 'padding: 5px; border-bottom: 1px solid black; background-color: #820E06;';
          div.style.cssText = baseCss
          div.onmouseover = () => {
            div.style.cssText = baseCss+'background-color: #EF5D4E; color: white; cursor: pointer;'
          }
          div.onmouseout = () => {
            div.style.cssText = baseCss
          }
          div.onclick = () => {
            this.event.goto(new LatLng(el.geocalisation.lat, el.geocalisation.lon))
          }

          const titre = document.createElement("p");
          titre.innerText = el.title;
          titre.style.cssText = `font-weight: bold; color: #E3E3E0;`

          const lieu = document.createElement("p");
          lieu.innerText = el.zone;
          lieu.style.cssText = `font-weight: italic; color: #E3E3E0;`

          const description = document.createElement("p");
          description.innerText = el.infos;
          description.style.cssText = `font-size: smaller; color: #E3E3E0;`

          const adresse = document.createElement("p");
          adresse.innerText = el.address;
          adresse.style.cssText = `font-size: smaller; color: #E3E3E0;`

          const mail = document.createElement("p");
          mail.innerText = el.mail;
          mail.style.cssText = `font-size: smaller; color: #E3E3E0;`

          const phone = document.createElement("p");
          phone.innerText = el.phone;
          phone.style.cssText = `font-size: smaller; color: #E3E3E0;`

          div.appendChild(titre);
          div.appendChild(lieu);
          div.appendChild(description);
          div.appendChild(adresse);
          div.appendChild(mail);
          div.appendChild(phone);
          place?.appendChild(div);
        }
      }
    })
  }
}
