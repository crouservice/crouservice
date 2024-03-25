import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private apiService: ApiService){};
  search2(): void {
    this.apiService.search((<HTMLInputElement>document.querySelector(".searchTerm")).value.toLowerCase().split(" "));
  }
}
