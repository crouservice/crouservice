import { Component } from '@angular/core';
import {ApiService} from "../../../api/api.service";
import {EvenementService} from "../../../evenement/evenement.service";

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private api: ApiService, private event: EvenementService) {
  }

  search(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.api.search((<HTMLInputElement>document.querySelector(".searchTerm")).value.toLowerCase().split(" "), null);
    this.event.majFiltre();
  }
}
