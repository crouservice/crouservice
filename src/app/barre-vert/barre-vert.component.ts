import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barre-vert',
  standalone: true,
  imports: [],
  templateUrl: './barre-vert.component.html',
  styleUrl: './barre-vert.component.css'
})
export class BarreVertComponent implements OnInit {
  ngOnInit(): void {
      console.log("Hello")
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
