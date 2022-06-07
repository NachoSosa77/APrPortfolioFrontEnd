import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Experience } from "../Model/experience.model";


@Injectable({
  providedIn: 'root',
})

export class ExperienceService {

 URL = environment.apiUrlBase;

  constructor(private http: HttpClient) { }

  public getExperience(): Observable<Experience[]>{
    return this.http.get<Experience[]>(`${this.URL}/experience`);
  }

  public getExperienceId(idExper: Experience): Observable<Experience>{
    return this.http.get<Experience>(`${this.URL}/experience/${idExper}`);
  }

  public newExperience(experience: Experience): Observable<Experience>{
    return this.http.post<Experience>(`${this.URL}/experience/new`, experience);
  }

  public updateExperience(experience:Experience): Observable<Experience>{
    return this.http.put<Experience>(`${this.URL}/experience/edit/58`, experience);
  }

  public deleteExperience(idExper: number): Observable<void>{
    return this.http.delete<void>(`${this.URL}/experience/delete/${idExper}`)
  }
}
