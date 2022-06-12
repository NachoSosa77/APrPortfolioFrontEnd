import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Model/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public editProject: Project | undefined;
  public deleteProject: Project | any;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  public getProjects(): void {
    this.projectService.getProject().subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  public openModal(mode: string, project?: Project): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-toggle', '#addProjectModal');
      console.log('Project modal add');
    } else if (mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-toggle', '#deleteProjectModal');
      console.log('Project modal delete');
    } else if (mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-toggle', '#editProjectModal');
      console.log('Project modal edit');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddProject(addForm: NgForm): void {
    document.getElementById('add-Project-form')?.click();
    this.projectService.newProject(addForm.value).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProjects();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        addForm.reset();
      },
    });
  }

  public updateProject(project: Project): void {
    this.editProject = project;
    this.projectService.updateProject(project).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProjects();
        console.log(project);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('error', project);
      },
    });
    console.log('Project Update!!');
  }

  public onDeleteProject(idProj: number): void {
    this.projectService.deleteProject(idProj).subscribe({
      next: (res: void) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error.message);
      },
    });
    console.log('Project Delete!!');
  }
}
