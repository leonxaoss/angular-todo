import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormInterface } from '../../interfaces/form-interface';
import { MatDialog } from '@angular/material';
import { DeleteContactDialogComponent } from '../../component/delete-contact-dialog/delete-contact-dialog.component';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {

  data: FormInterface[] = [];

  constructor(private FormSer: FormService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.FormSer.getAll().subscribe((response: FormInterface[]) => {
      this.data = response;
    });
  }

  deleteBlock(id: number) {

    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(((result) => {
        if (result) {
          this.FormSer.deleteNode(id)
            .subscribe(() => {
              this.data = this.data.filter(item => item.id !== id);
            });
        }
      }));

  }

}
