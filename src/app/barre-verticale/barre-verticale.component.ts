import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-barre-verticale',
  standalone: false,
  //imports: [NgFor],
  templateUrl: './barre-verticale.component.html',
  styleUrl: './barre-verticale.component.css'
})
export class BarreVerticaleComponent {
  Liste:any =[{"title":"test"},{"title":"test1"}];
  
  constructor(private apiService: ApiService){};
  ngOnInit(): void{
    this.apiService.GetInfo().subscribe(res =>{
      console.log(res)
      this.Liste=res;
    });
  }
  
}
