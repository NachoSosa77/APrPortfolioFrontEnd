import { User } from './../../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  user: User = new User ("","","","","");
  public deleteAbout: User | undefined;
  formModal: any;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });

  }




  public openModal(mode: String, user?: User): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = "none";
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      console.log('Mode add!!')
      button.setAttribute('data-target', '#addAboutModal');
    } else if (mode === 'delete') {
      console.log('Mode delete!!')
      this.deleteAbout = user;
      button.setAttribute('data-target', '#deleteAboutModal');
    }
    container?.appendChild(button);
    button.click();
    console.log('click 1');

  }





  public onAddAbout(addForm: NgForm) {
    document.getElementById("add-about-form")?.click();
    this.userService.newUser(addForm.value).subscribe({
      next: (response: User) => {
        console.log(User);
        addForm.reset();

      },
      error: (error: HttpErrorResponse)=>{
        console.log(error.message);
        this.getUser();
        addForm.reset();

      }
    })
    console.log('New User!!');
  }

  public onDeleteAbout(idUser: number): void {
    console.log(idUser);
    this.userService.deleteUser(idUser).subscribe({
      next: (res: void) => {
        console.log(res);

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }
}
