import { Component, OnInit } from '@angular/core';
import { FormInterface } from '../../interfaces/form-interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  data: FormInterface[] = [];

  constructor() { }

  ngOnInit() {
  }

}
