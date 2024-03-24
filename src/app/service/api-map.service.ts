import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LatLngBounds} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class ApiMapService {

  //node/express  api
  REST_API : string ="http://127.0.0.1:3080"
  constructor(private httpClient : HttpClient) { }

  getLogements(bounds: LatLngBounds){
    console.log(`${this.REST_API}/logement/${bounds.getNorthWest().lat}/${bounds.getNorthWest().lng}/${bounds.getSouthEast().lat}/${bounds.getSouthEast().lng}`);
    return this.httpClient.get(`${this.REST_API}/logement/${bounds.getNorthWest().lat}/${bounds.getNorthWest().lng}/${bounds.getSouthEast().lat}/${bounds.getSouthEast().lng}`);
  }

  getRestaurants(bounds: LatLngBounds) {
    console.log(`${this.REST_API}/restaurant/${bounds.getNorthWest().lat}/${bounds.getNorthWest().lng}/${bounds.getSouthEast().lat}/${bounds.getSouthEast().lng}`);
    return this.httpClient.get(`${this.REST_API}/restaurant/${bounds.getNorthWest().lat}/${bounds.getNorthWest().lng}/${bounds.getSouthEast().lat}/${bounds.getSouthEast().lng}`);
  }

  getUniversites() {
    console.log(`${this.REST_API}/etablissement`);
    return this.httpClient.get(`${this.REST_API}/etablissement`);
  }
}
