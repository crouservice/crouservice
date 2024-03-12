import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientJsonpModule } from '@angular/common/http';
import { BarreVerticaleComponent } from '../barre-verticale/barre-verticale.component';
import { ApiService } from '../services/api.service';

import { AppComponent } from '../app.component';


@NgModule({
  declarations: [
    BarreVerticaleComponent
  ],
  imports: [
    CommonModule,
    HttpClientJsonpModule,
  ], 
  providers:[ApiService],
  bootstrap:[AppComponent],
  exports:[BarreVerticaleComponent]
})
export class BarreVerticaleSearchModule { }
