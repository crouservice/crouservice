import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientJsonpModule } from '@angular/common/http';
import { BarreVertComponent } from '../barre-vert/barre-vert.component';
import { SearchComponent } from '../search/search.component';

import { ApiService } from '../services/api.service';

import { AppComponent } from '../app.component';


@NgModule({
  declarations: [
    BarreVertComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientJsonpModule,
  ], 
  providers:[ApiService],
  bootstrap:[AppComponent],
  exports:[
    BarreVertComponent,
	  SearchComponent
	]
})
export class CommunicationModule {}