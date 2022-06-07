import { EducationService } from './../../services/education.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/Model/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public educations: Education[] = [];
  public editEducation: Education | undefined;
  public deleteEdu: Education | any;

  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.getEducations()
  }

  public getEducations(): void {
    this.educationService.getEducation().subscribe({
      next: (res: Education[]) => {
        this.educations = res;
        //console.log(this.educations);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

  public openModal(mode: string, education?: Education): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-toggle', '#addEducationModal');
      console.log('education modal add');
    } else if (mode === 'delete') {
      this.deleteEdu = education;
      button.setAttribute('data-toggle', '#deleteEducationModal');
      console.log('education modal delete');
    } else if (mode === 'edit') {
      this.editEducation = education;
      button.setAttribute('data-toggle', '#editEducationModal')
      console.log('education modal edit');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddeducation(addForm: NgForm): void {
    document.getElementById('add-education-form')?.click();
    this.educationService.newEducation(addForm.value).subscribe({
      next: (response: Education) => {
        console.log(response);
        this.getEducations();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        addForm.reset();
      }
    })
  }

  public updateEducation(education: Education): void {
    this.editEducation = education;
    this.educationService.updateEducation(education).subscribe({
      next: (response: Education) => {
        console.log(response);
        this.getEducations();
        console.log(education);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log("error", education);
      }
    })
    console.log('education Update!!');
  }

  public onDeleteEducation(idExper: number): void {
    this.educationService.deleteEducation(idExper).subscribe({
      next: (res: void) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        console.log("error", error.message);
      }
    })
    console.log('education Delete!!');
  }

}


