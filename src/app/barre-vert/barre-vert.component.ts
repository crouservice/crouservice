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
}
