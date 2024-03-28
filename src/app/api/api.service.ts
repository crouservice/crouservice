import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LatLngBounds} from "leaflet";
import {concat, Observable} from "rxjs";
// @ts-ignore
import * as config from "../../../config.json";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  REST_API: string = `${config.api.protocol || 'http'}://${config.api.host || '127.0.0.1'}:${config.api.port || '3080'}`
  trisActifs: any = null;
  trisPossible: any = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(`${this.REST_API}/tri`).subscribe(res =>{
      this.trisPossible = (res as any)["trie"];
    });
  }

  /**
   * Fonction qui récupère les logements
   * @param bounds Position de la carte
   */
  getLogements(bounds: LatLngBounds | null) {
    return this.httpClient.get(`${this.REST_API}/logement${bounds != null ? `/${bounds.getNorthWest().lat}/${bounds.getNorthWest().lng}/${bounds.getSouthEast().lat}/${bounds.getSouthEast().lng}` : ''}${this.trisActifs != null ? `/{"trie":${JSON.stringify(this.trisActifs.join(','))}}` : ''}`);
  }

  /**
   * Fonction qui récupère les restaurants
   * @param bounds Position de la carte
   */
  getRestaurants(bounds: LatLngBounds | null) {
    return this.httpClient.get(`${this.REST_API}/restaurant${bounds != null ? `/${bounds.getNorthWest().lat}/${bounds.getNorthWest().lng}/${bounds.getSouthEast().lat}/${bounds.getSouthEast().lng}` : ''}${this.trisActifs != null ? `/{"trie":${JSON.stringify(this.trisActifs.join(','))}}` : ''}`);
  }

  /**
   * Fonction qui récupère les universités
   */
  getUniversites() {
    return this.httpClient.get(`${this.REST_API}/etablissement`);
  }


  /**
   * Fonction qui récupère les mots de la barre de recherche et les filtres pour créer les logements et restaurants correspondant aux mots
   * @param searchTerms Mots de la barre de recherche
   * @param bound Position de la carte
   */
  search(searchTerms: string[], bound: LatLngBounds | null) {
    let donnees = this.trisPossible
    let resultat: string[] | null = [];
    // this.resultat = this.resultat.concat(this.tFiltres);

    // récupère les mots qui sont inclus dans donnees
    for(let i = 0; i < searchTerms.length; i++) {
      for(let j = 0; j < donnees.length; j++) {
        if(donnees.indexOf(searchTerms[i]) > -1 && resultat.indexOf(searchTerms[i]) == -1) {
          resultat.push(searchTerms[i]);
        }
      }
    }

    if (resultat.length == 0) {
      resultat = null;
    }
    this.trisActifs = resultat;
    return concat(this.getLogements(bound), this.getRestaurants(bound));
  }

  /**
   * Mise à jour de la zone de recherche
   * @param nomFiltre Nom du filtre
   * @param dim Posittion de la carte
   */
  filtres(nomFiltre: string, dim: LatLngBounds | null) {
    if (this.trisActifs == null) {
      this.trisActifs = [];
    }
    if (this.trisActifs.includes(nomFiltre)) {
      this.trisActifs = this.trisActifs.filter((value: any) => value != nomFiltre);
    } else {
      this.trisActifs.push(nomFiltre);
    }
    if (this.trisActifs.length == 0) {
      this.trisActifs = null;
    }
    return concat(this.getLogements(dim), this.getRestaurants(dim));
  }
}
