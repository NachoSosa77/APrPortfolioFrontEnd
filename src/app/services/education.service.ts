import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Education } from "../Model/education.model";


@Injectable({
  providedIn: 'root',
})

export class EducationService {

 URL = environment.apiUrlBase;

  constructor(private http: HttpClient) { }

  public getEducation(): Observable<Education[]>{
    return this.http.get<Education[]>(`${this.URL}/education`);
  }

  public getEducationId(idEduc: Education): Observable<Education>{
    return this.http.get<Education>(`${this.URL}/education/${idEduc}`);
  }

  public newEducation(education: Education): Observable<Education>{
    return this.http.post<Education>(`${this.URL}/education/new`, education);
  }

  public updateEducation(education:Education): Observable<Education>{
    return this.http.put<Education>(`${this.URL}/education/edit/58`, education);
  }

  public deleteEducation(idEduc: number): Observable<void>{
    return this.http.delete<void>(`${this.URL}/education/delete/${idEduc}`)
  }
}
