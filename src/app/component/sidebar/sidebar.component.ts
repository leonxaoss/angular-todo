import { Component, OnInit } from '@angular/core';
import { FormInterface } from '../../interfaces/form-interface';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  data: FormInterface[] = [];

  constructor(private FormSer: FormService) { }

  ngOnInit() {
    this.FormSer.getAll().subscribe((response: FormInterface[]) => {
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
