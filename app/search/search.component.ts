import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  resultat: string[] = [];

  ngOnInit(): void {
    this.resultat = [];
  }

  search() {
    var mots_cles = (<HTMLInputElement>document.querySelector(".searchTerm")).value.toLowerCase().split(" ");
    var donnees = [
      "residence", 
      "résidence", 
      "logement", 
      "restaurant", 
      "appartement"
    ];
    
    // récupère les mots qui sont inclus dans donnees
    for(var i = 0; i < mots_cles.length; i++) {
       for(var j = 0; j < donnees.length; j++) {
          if(donnees.indexOf(mots_cles[i]) > -1 && this.resultat.indexOf(mots_cles[i]) == -1) {
             this.resultat.push(mots_cles[i]);
          }
       }
    }
 }
}
