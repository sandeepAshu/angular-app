import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

export interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  }
  
  export interface UserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  
  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;
  }
  
  
@Injectable({
    providedIn: 'root'
})


export class UserService {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';
    
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl);
    }
}