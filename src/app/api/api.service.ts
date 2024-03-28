import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LatLngBounds} from "leaflet";
import {concat, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  REST_API: string = "http://127.0.0.1:3080"
  trisActifs: any = null;
  trisPossible: any = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(`${this.REST_API}/tri`).subscribe(res =>{
      console.log(res);
      this.trisPossible = (res as any)["trie"];
      console.log(this.trisPossible);
    });
  }

  getLogements(bounds: LatLngBounds | null) {
    return this.httpClient.get(`${this.REST_API}/logement${bounds != null ? `/
${bounds.getNorthWest().lat}/
${bounds.getNorthWest().lng}/
${bounds.getSouthEast().lat}/
${bounds.getSouthEast().lng}` : ''}${this.trisActifs != null ? `/{"trie":${JSON.stringify(this.trisActifs.join(','))}}` : ''}`);
  }

  getRestaurants(bounds: LatLngBounds | null) {
    return this.httpClient.get(`${this.REST_API}/restaurant${bounds != null ? `/
${bounds.getNorthWest().lat}/
${bounds.getNorthWest().lng}/
${bounds.getSouthEast().lat}/
${bounds.getSouthEast().lng}` : ''}${this.trisActifs != null ? `/{"trie":${JSON.stringify(this.trisActifs.join(','))}}` : ''}`);
  }

  getUniversites() {
    return this.httpClient.get(`${this.REST_API}/etablissement`);
  }


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

    // Supprime tous les items de la barre verticale
    // var place = document.getElementById("placeItems");

    // if ( place) {
      // Sélectionnez tous les éléments div enfants
      // var childDivs =  place.querySelectorAll("div");

      // Parcourez chaque élément div enfant et supprimez-le
      // childDivs.forEach(function(child) {
      //   child.remove();
      // });
    // }

    // Créé les restaurants en fonction des filtres
    // this.creationRestaurants(bound).subscribe((elements: HTMLElement[]) => {
    //   for (const el of elements) {
    //     if (el != undefined) {
    //       place?.appendChild(el);
    //     }
    //   }
    // })

    // Créé les logements en fonction des filtres
    // this.creationLogements().subscribe((elements: HTMLElement[]) => {
    //   for (const el of elements) {
    //     if (el != undefined) {
    //       place?.appendChild(el);
    //     }
    //   }
    // })

    // afficher les résultats de la recherche
    //console.log('Résultat de la recherche : ', this.resultat);
  }

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
