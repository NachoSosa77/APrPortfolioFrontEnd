import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/Model/experience.model';
import { ExperienceService } from 'src/app/services/experience.service';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  public experiences: Experience[] = [];
  public editExperience: Experience | undefined;
  public deleteExperience: Experience | undefined;
  public idExper: Experience | undefined;

  constructor(private experienceService: ExperienceService) { }

  ngOnInit(){
    this.getExperiences();
  }

  public getExperiences(): void{
    this.experienceService.getExperience().subscribe({
      next: (res: Experience[])=>{
        this.experiences = res;
      },
      error: (error: HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public openModal(mode: string, experience?: Experience): void {
    console.log(experience);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-toggle', '#addExperienceModal' );
      console.log('Experience modal add');
    }else if (mode === 'delete'){
      this.deleteExperience = experience;
      button.setAttribute('data-toggle', '#deleteExperienceModal');
      console.log('Experiene modal delete');
    }else if (mode === 'edit'){
      this.editExperience = experience;
      button.setAttribute('data-toggle', '#editExperienceModal')
      console.log('Experience modal edit');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddExperience(addForm: NgForm): void {
    document.getElementById('add-Experience-form')?.click();
    this.experienceService.newExperience(addForm.value).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperiences();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        addForm.reset();
      }
    })
  }

  public updateExperience(/* idExper: number, */experience: Experience): void {
    this.editExperience = experience;

    this.experienceService.updateExperience(/* idExper, */ experience).subscribe({

      next: (response: Experience) => {
        console.log(response);
        this.getExperiences();
        console.log(experience);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log("error", experience);
      }
    })
  }

  public onDeleteExperience(idExper: number): void {
    this.experienceService.deleteExperience(idExper).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperiences();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }




}
