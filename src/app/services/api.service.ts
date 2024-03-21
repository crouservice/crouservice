import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  resultat: string[] = [];

  ngOnInit(): void {
    this.resultat = [];
  }

  REST_API : string ="http://127.0.0.1:3080/restaurant"
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
    // afficher les résultats de la recherche
    console.log('Résultat de la recherche : ', this.resultat);
  }

  creationItems(): Observable<HTMLElement[]> {
    /*const items :any= [
      { id: 1, name: "Item 1", imageUrl: "assets/search.png"},
      { id: 2, name: "Item 2", imageUrl: "assets/search.png"},
      { id: 3, name: "Item 3", imageUrl: "assets/search.png"},
      { id: 4, name: "Item 4", imageUrl: "assets/search.png"},
    ];*/

    return this.httpCLient.get(`${this.REST_API}`).pipe(map((data: Object) => {
      let items:any[] = data as any[]
      let elements:HTMLElement[] = Array(items.length);
      for(let i = 0; i < items.length; i++) {
        const item = items[i];

        const div = document.createElement("div");
        div.className = 'item';
        div.style.cssText = `padding: 5px; border-bottom: 1px solid black;`

        const titre = document.createElement("p");
        titre.innerText = item.title;
        titre.style.cssText = `font-weight: bold;`

        const description = document.createElement("p");
        description.innerText = item.infos;
        description.style.cssText = `font-size: smaller;`

        div.appendChild(titre);
        div.appendChild(description);
        elements.push(div);
      }
      return elements;
    }))
  }

  
  GetInfo(){
    console.log(this.httpCLient.get(`${this.REST_API}`));
    return this.httpCLient.get(`${this.REST_API}`);
  }
}
