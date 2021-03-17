import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  data: UserInterface[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe((response: UserInterface[]) => {
      this.data = response.filter(
        item => (`
        ${new Date(item.date).getMonth().toString()}-
        ${new Date(item.date).getDate().toString()}
        `) === (`
        ${new Date().getMonth().toString()}-
        ${new Date().getDate().toString()}
        `)
      );
    });
  }

}
