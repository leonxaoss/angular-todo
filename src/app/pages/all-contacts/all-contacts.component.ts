import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormInterface } from '../../interfaces/form-interface';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {

  data: FormInterface[] = [];

  constructor(private FormSer: FormService) { }

  ngOnInit() {
    this.FormSer.getAll().subscribe((response: FormInterface[]) => {
      // console.log(response);
      this.data = response;
    });
  }

  deleteBlock(id: number) {
    const isDelete = confirm('Do you wont delete block?');
    if (isDelete) {
      this.FormSer.deleteNode(id)
        .subscribe(() => {
          this.data = this.data.filter(item => item.id !== id);
        });
    }
  }

}
