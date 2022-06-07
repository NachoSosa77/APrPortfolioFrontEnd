import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../../Model/user.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  public user: User[] = [];
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
}
