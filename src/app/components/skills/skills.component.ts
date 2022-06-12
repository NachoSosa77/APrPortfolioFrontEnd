import { SkillsService } from './../../services/skill.service';
import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/Model/skill.model';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';





@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public skills: Skill[] = [];
  public editSkill: Skill | undefined;
  public deleteSkill: Skill | undefined;

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.getSkill();
  }
  public getSkill(): void {
    this.skillsService.getSkill().subscribe({
      next: (response: Skill[]) => {
        this.skills = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }
  public onOpenModal(mode: string, skill?: Skill): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillModal');
      console.log('Skills modal add');
    } else if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-target', '#deleteSkillModal');
      console.log('Skill modal delete');
    } else if (mode === 'edit') {
      this.editSkill = skill;
      button.setAttribute('data-target', '#editSkillModal');
      console.log('Skill modal edit');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddSkill(addForm: NgForm): void {
    document.getElementById('add-skill-form')?.click();
    this.skillsService.addSkill(addForm.value).subscribe({
      next: (response: Skill) => {
        this.getSkill();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);

        addForm.reset();
      },
    });
  }

  public onUpdateSkill(skill: Skill ): void {
    this.editSkill = skill;
    console.log(skill);
    this.skillsService.updateSkill(skill).subscribe({
      next: (res: Skill) => {
        console.log(res);
        this.getSkill();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteSkill(idSkill: number): void {
    this.skillsService.deleteSkill(idSkill).subscribe({
      next: (response: void) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
    console.log('Skill Delete!!');
  }

  public formatSubtitle = (percent: number) => {
    return `${percent}%`;
  }



}
