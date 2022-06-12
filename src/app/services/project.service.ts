import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Project } from "../Model/project.model";


@Injectable({
  providedIn: 'root',
})

export class ProjectService {

 URL = environment.apiUrlBase;

  constructor(private http: HttpClient) { }

  public getProject(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.URL}/projects`);
  }

  public getProjectId(idProj: Project): Observable<Project>{
    return this.http.get<Project>(`${this.URL}/projects/${idProj}`);
  }

  public newProject(project: Project): Observable<Project>{
    return this.http.post<Project>(`${this.URL}/projects/new`, project);
  }

  public updateProject(project:Project): Observable<Project>{
    return this.http.put<Project>(`${this.URL}/projects/edit/${project.idProj}`, project);
  }

  public deleteProject(idProj: number): Observable<void>{
    return this.http.delete<void>(`${this.URL}/projects/delete/${idProj}`)
  }
}
