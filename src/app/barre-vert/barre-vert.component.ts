import { ApiService } from '../services/api.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-barre-vert',
  
  //imports: [],
  templateUrl: './barre-vert.component.html',
  styleUrl: './barre-vert.component.css',
})
export class BarreVertComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef, private service: ApiService) {}

  ngOnInit(): void {
    setTimeout(() => this.creationRestaurants(this.service), 10)
    setTimeout(() => this.creationLogements(this.service), 10)
  }

  creationRestaurants(service: ApiService): void {
    var place = document.getElementById("placeItems");
    service.creationRestaurants().subscribe((elements: HTMLElement[]) => {
      for (const el of elements) {
        console.log(el)
        if (el != undefined) {
          place?.appendChild(el);
        }
      }
    })
  }

  creationLogements(service: ApiService): void {
    var place = document.getElementById("placeItems");
    service.creationLogements().subscribe((elements: HTMLElement[]) => {
      for (const el of elements) {
        console.log(el)
        if (el != undefined) {
          place?.appendChild(el);
        }
      }
    })
  }

  acces_pmr(): void {}
  parking(): void {}
  laverie(): void {}
  cuisine_collec(): void {}
  douche_indiv(): void {}
  kitchenette_indiv(): void {}
  internet(): void {}
  garage_velos(): void {}
  securite(): void {}
  restauration_sur_place(): void {}
  salle_de_travail(): void {}
}
