import { Injectable } from '@angular/core';
import { catchError,map   } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //node/express  api
  REST_API : string ="http://127.0.0.1:3080/liste"
  constructor(private httpCLient : HttpClient) { }
  
  GetInfo(){
    console.log(this.httpCLient.get(`${this.REST_API}`));
    return this.httpCLient.get(`${this.REST_API}`);
  }
}


