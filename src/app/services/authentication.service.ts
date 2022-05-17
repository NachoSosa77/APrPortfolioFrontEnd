import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /* url="http://localhost:8080/ver/personas"
  currentUserSubject: BehaviorSubject<any>; */
  constructor(/* private http: HttpClient */) {
    /* this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentuser')||'{}')); */
   }

   Login(){
     return console.log('Conectado!!')

   }
}
