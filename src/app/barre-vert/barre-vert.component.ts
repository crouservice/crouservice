import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-barre-vert',
  standalone: true,
  imports: [NgFor],
  templateUrl: './barre-vert.component.html',
  styleUrl: './barre-vert.component.css'
})
export class BarreVertComponent implements OnInit {
  //Liste:any=[{"title":"test"}, {"title":"test1"}];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    console.log("Hello")
  }

  creationItems(): void {
    const items = [
      { id: 1, name: "Item 1", imageUrl: "https://www.google.com/search?client=ubuntu&hs=BUJ&sca_esv=5d2091cbd4f7042a&channel=fs&sxsrf=ACQVn08OKzu4zyrbaRBiOeLaVYkQOf3bTA:1710855676028&q=image&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjmmtOGuoCFAxXqUaQEHcW5AKQQ0pQJegQIExAB&biw=1848&bih=968&dpr=1#imgrc=0E5dDA82VanW3M"},
      { id: 2, name: "Item 2", imageUrl: "https://www.google.com/search?client=ubuntu&hs=BUJ&sca_esv=5d2091cbd4f7042a&channel=fs&sxsrf=ACQVn08OKzu4zyrbaRBiOeLaVYkQOf3bTA:1710855676028&q=image&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjmmtOGuoCFAxXqUaQEHcW5AKQQ0pQJegQIExAB&biw=1848&bih=968&dpr=1#imgrc=0E5dDA82VanW3M"},
      { id: 3, name: "Item 3", imageUrl: "https://www.google.com/search?client=ubuntu&hs=BUJ&sca_esv=5d2091cbd4f7042a&channel=fs&sxsrf=ACQVn08OKzu4zyrbaRBiOeLaVYkQOf3bTA:1710855676028&q=image&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjmmtOGuoCFAxXqUaQEHcW5AKQQ0pQJegQIExAB&biw=1848&bih=968&dpr=1#imgrc=0E5dDA82VanW3M"},
      { id: 4, name: "Item 4", imageUrl: "https://www.google.com/search?client=ubuntu&hs=BUJ&sca_esv=5d2091cbd4f7042a&channel=fs&sxsrf=ACQVn08OKzu4zyrbaRBiOeLaVYkQOf3bTA:1710855676028&q=image&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjmmtOGuoCFAxXqUaQEHcW5AKQQ0pQJegQIExAB&biw=1848&bih=968&dpr=1#imgrc=0E5dDA82VanW3M"},
    ];

    for(let i = 0; i < items.length; i++) {
      const item = items[i];

      const div = document.createElement('div');
      div.className = 'item';
      div.style.cssText = `padding: 5px;`

      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.name;
      img.style.cssText = `width: 100%; height: auto;`

      const text = document.createElement('p');
      text.innerText = item.name;

      div.appendChild(img);
      div.appendChild(text);
      this.renderer.appendChild(this.el.nativeElement, div);
    }
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
