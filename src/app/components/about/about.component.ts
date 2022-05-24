import { User } from './../../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  user: User = new User("","","","","")

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(data =>{this.user = data})
  }

}
