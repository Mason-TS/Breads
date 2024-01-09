import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = "http://localhost:5190/api/Auth";
  tokenKey: string = "myPostToken";
  loggedInUser?:string = undefined;

  constructor(private http: HttpClient) { }

  signUp(newUser: User){
    return this.http.post(`${this.baseURL}/register`, newUser);
  
}

  login(username: string, password: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('password', password);

    return this.http.get(`${this.baseURL}/login`,  { params: queryParams, responseType: 'text' })
      .pipe(tap((response: any) => {
        localStorage.removeItem('loggedOutToken');
        localStorage.setItem('myPostToken', response);
        this.setLoginUser(username);
        localStorage.setItem('userLoggedIn', username);
        console.log(username + "user.service.login");


      }));
}

  setLoginUser(username: string | undefined) {
    this.loggedInUser = username;
    console.log(username + " user.service.setLoginUser");
    return username;
    
  }

  getUser(): string | undefined {
    if (localStorage.getItem('myPostToken')) {

      this.loggedInUser = localStorage.getItem('userLoggedIn') ?? undefined;
      console.log(this.loggedInUser + " user.service.findUser")
      return this.loggedInUser;
    }
    return undefined;
  }

  logOut() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('myPostToken');
    localStorage.setItem('loggedOutToken', "he's, out");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('myPostToken'); 
  }

  getUserByUsername(username:string) {
    return this.http.get<User>(this.baseURL + "/" + username);
  }

  updateUser(username: string | undefined, newUser: User): Observable<Object> {
    if (!username) {
      console.error('Username is undefined. Unable to update user.');
      return of({}); 
    }
    return this.http.put(`${this.baseURL}/${username}`, newUser);
  }
}
