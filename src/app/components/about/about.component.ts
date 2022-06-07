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
  public user: User[] = [];
  public deleteAbout: User | undefined;
  public updateUser: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUser().subscribe({
      next: (res: User[]) => {
        this.user = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error.message);
      },
    });
  }

  public openModal(mode: String, user?: User): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      console.log('Mode add!!');
      button.setAttribute('data-target', '#addAboutModal');
    } else if (mode === 'delete') {
      console.log('Mode delete!!');
      this.deleteAbout = user;
      button.setAttribute('data-target', '#deleteAboutModal');
    }
    container?.appendChild(button);
    button.click();
    console.log('click 1');
  }

  public onAddAbout(addForm: NgForm) {
    document.getElementById('add-about-form')?.click();
    this.userService.newUser(addForm.value).subscribe({
      next: (res: User) => {
        console.log(res);
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.getUsers();
        addForm.reset();
      },
    });
    console.log('New User!!');
  }

  public updateAbout(user: User): void {
    this.updateUser = user;
    this.userService.updateUser(user).subscribe({
      next: (response: User) => {
        console.log(response);
        this.getUsers();
        console.log(user);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log("error", user);
      }
    })
    console.log('user Update!!');
  }

  public onDeleteAbout(idUser: number): void {
    console.log(idUser);
    this.userService.deleteUser(idUser).subscribe({
      next: (res: void) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
    console.log('User Delete!!');
  }
}
