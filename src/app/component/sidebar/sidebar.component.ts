import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  users: UserInterface[] = [];
  data: UserInterface[] = [];
  itemSearch = {};
  arrSearch: UserInterface[] = [];
  searchValue = '';
  isFocus = false;
  isResults = false;
  timer: any;

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response: UserInterface[]) => {
      this.users = response;
      this.data = response.filter(
        (item: UserInterface) => (`
        ${new Date(item.date).getMonth().toString()}-
        ${new Date(item.date).getDate().toString()}
        `) === (`
        ${new Date().getMonth().toString()}-
        ${new Date().getDate().toString()}
        `)
      );
    });
  }

  handleInput(event: any): void {
    const value = event.target.value;
    this.debounce(() => {
      // ---- search ----

      if (value){
        this.arrSearch = this.users.filter((item: UserInterface) => {
          return (this.formatValue(item).toLowerCase()).includes(value.toLowerCase());
        });

        this.isResults = !this.arrSearch.length;

      } else {
        this.arrSearch = [];
        this.isResults = false;
      }

      // ---- /search ----
    });
  }

  handleFocus(): void {
    this.isFocus = true;
    setTimeout(() => {
      this.isFocus = true;
    }, 210);
  }

  handleBlur(): void {
    setTimeout(() => {
      this.isFocus = false;
      this.isResults = false;
    }, 200);
  }

  setSearchItem(item: UserInterface): void {
    this.router.navigate(['details-contact/', item.id]);
    this.itemSearch = item;
    this.searchValue = this.formatValue(item);
    this.isFocus = false;
    // console.log(5445, item);
  }

  formatValue(item: UserInterface): string {
    return item.lastName + ' ' + item.name;
  }

  clearSearch(): void {
    this.itemSearch = {};
    this.searchValue = '';
    setTimeout(() => {
      this.arrSearch = [];
    }, 50);
  }

  debounce(fn = () => {}, timeout = 500): void{
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(fn, timeout);
  }

}
