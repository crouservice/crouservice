import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  resultat: string[] = [""];

  REST_API_Res : string ="http://127.0.0.1:3080/restaurant"
  REST_API_Log : string ="http://127.0.0.1:3080/logement"
  constructor(private httpCLient : HttpClient) { }
  
  search(searchTerms: string[]) {
    var donnees = [
      "residence", 
      "résidence", 
      "logement", 
      "restaurant", 
      "appartement"
    ];
    
    // récupère les mots qui sont inclus dans donnees
    for(var i = 0; i < searchTerms.length; i++) {
       for(var j = 0; j < donnees.length; j++) {
          if(donnees.indexOf(searchTerms[i]) > -1 && this.resultat.indexOf(searchTerms[i]) == -1) {
             this.resultat.push(searchTerms[i]);
          }
       }
    }

    // Supprime tous les items de la barre verticale
    var place = document.getElementById("placeItems");
    place?.remove();

    /*this.REST_API_Res = "http://127.0.0.1:3080/restaurant";
    this.REST_API_Log = "http://127.0.0.1:3080/logement";

    this.creationRestaurants().subscribe((elements: HTMLElement[]) => {
      for (const el of elements) {
        console.log(el)
        if (el != undefined) {
          place?.appendChild(el);
        }
      }
    })

    this.creationLogements().subscribe((elements: HTMLElement[]) => {
      for (const el of elements) {
        console.log(el)
        if (el != undefined) {
          place?.appendChild(el);
        }
      }
    })*/

    // afficher les résultats de la recherche
    console.log('Résultat de la recherche : ', this.resultat);
  }

  creationRestaurants(): Observable<HTMLElement[]> {
    this.REST_API_Res = this.REST_API_Res + '/{"trie":' + JSON.stringify(this.resultat) + '}';
    return this.httpCLient.get(`${this.REST_API_Res}`).pipe(map((data: Object) => {
      let items:any[] = data as any[]
      let elements:HTMLElement[] = Array(items.length);
      for(let i = 0; i < items.length; i++) {
        const item = items[i];

        const div = document.createElement("div");
        div.className = 'item';
        div.style.cssText = `padding: 5px; border-bottom: 1px solid black;`

        const titre = document.createElement("p");
        titre.innerText = item.title;
        titre.style.cssText = `font-weight: bold; color: #E3E3E0;`

        const lieu = document.createElement("p");
        lieu.innerText = item.zone;
        lieu.style.cssText = `font-weight: italic; color: #E3E3E0;`

        const description = document.createElement("p");
        description.innerText = item.infos;
        description.style.cssText = `font-size: smaller; color: #E3E3E0;`

        div.appendChild(titre);
        div.appendChild(lieu);
        div.appendChild(description);
        elements.push(div);
      }
      return elements;
    }))
  }

  creationLogements(): Observable<HTMLElement[]> {
    this.REST_API_Log = this.REST_API_Log + '/{"trie":' + JSON.stringify(this.resultat) + '}';
    console.log(this.REST_API_Log);
    return this.httpCLient.get(`${this.REST_API_Log}`).pipe(map((data: Object) => {
      let items:any[] = data as any[]
      let elements:HTMLElement[] = Array(items.length);
      for(let i = 0; i < items.length; i++) {
        const item = items[i];

        const div = document.createElement("div");
        div.className = 'item';
        div.style.cssText = `padding: 5px; border-bottom: 1px solid black;`

        const titre = document.createElement("p");
        titre.innerText = item.title;
        titre.style.cssText = `font-weight: bold; color: #E3E3E0;`

        const lieu = document.createElement("p");
        lieu.innerText = item.zone;
        lieu.style.cssText = `font-weight: italic; color: #E3E3E0;`

        const description = document.createElement("p");
        description.innerText = item.infos;
        description.style.cssText = `font-size: smaller; color: #E3E3E0;`

        const adresse = document.createElement("p");
        adresse.innerText = item.address;
        adresse.style.cssText = `font-size: smaller; color: #E3E3E0;`
        
        const mail = document.createElement("p");
        mail.innerText = item.mail;
        mail.style.cssText = `font-size: smaller; color: #E3E3E0;`

        const phone = document.createElement("p");
        phone.innerText = item.phone;
        phone.style.cssText = `font-size: smaller; color: #E3E3E0;`

        div.appendChild(titre);
        div.appendChild(lieu);
        div.appendChild(description);
        div.appendChild(adresse);
        div.appendChild(mail);
        div.appendChild(phone);
        elements.push(div);
      }
      return elements;
    }))
  }

}
