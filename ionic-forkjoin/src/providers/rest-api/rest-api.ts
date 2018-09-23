import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {forkJoin} from "rxjs/observable/forkJoin";


const apiUrl = "http://api.zippopotam.us/";
@Injectable()
export class RestApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
    
  }
  getData(): Observable<any> {
    let response1 = this.http.get(apiUrl+'US/00210');
    let response2= this.http.get(apiUrl+'IN/110001');
    let response3 = this.http.get(apiUrl+'BR/01000-000');
    let response4 = this.http.get(apiUrl+'FR/01000');
    return forkJoin([response1, response2, response3, response4]);
  }
  
  
 getPromisedData(){
  return new Promise((resolve, reject)=>{
    let response1 = this.http.get(apiUrl+'US/00210');
      let response2= this.http.get(apiUrl+'IN/110001');
      let response3 = this.http.get(apiUrl+'BR/01000-000');
      let response4 = this.http.get(apiUrl+'FR/01000');
      forkJoin([response1, response2, response3, response4]).subscribe(response => {
        resolve(response);
      },err => {
        reject(err);
      } )
  })
  }}






