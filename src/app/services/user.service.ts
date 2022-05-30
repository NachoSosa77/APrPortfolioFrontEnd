import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../Model/user.model";


@Injectable({
  providedIn: 'root',
})

export class UserService {

 URL = environment.apiUrlBase;

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User>{
    return this.http.get<User>(`${this.URL}/users/24`);
  }

  public newUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.URL}/users/new`, user);
  }

  public updateUser(user:User): Observable<User>{
    return this.http.put<User>(`${this.URL}/users/update`, user);
  }

  public deleteUser(idUser: number): Observable<void>{
    return this.http.delete<void>(`${this.URL}/users/delete/${idUser}`)
  }
}
