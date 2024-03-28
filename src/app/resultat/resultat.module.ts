import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResultatComponent} from "./components/resultat/resultat.component";



@NgModule({
  declarations: [
    ResultatComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResultatComponent
  ]
})
export class ResultatModule { }
