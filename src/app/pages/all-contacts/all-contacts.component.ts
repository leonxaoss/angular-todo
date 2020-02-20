import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormInterface } from '../../interfaces/form-interface';
import { MatDialog } from '@angular/material';
import { DeleteContactDialogComponent } from '../../component/delete-contact-dialog/delete-contact-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {

  data: FormInterface[] = [];

  constructor(private FormSer: FormService,
              private router: Router,
              private ActivateRoute: ActivatedRoute,
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

  setQuery(queryParam: object): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.ActivateRoute,
        queryParams: queryParam,
        queryParamsHandling: 'merge'
      }
    );
  }

  changeQuery(event): void {
    const value: string = event.currentTarget.value;
    const key: string = 'group' + event.currentTarget.name;
    const qe = {};

    if (event.currentTarget.checked) {
      qe[key] = value;

      this.setQuery(qe);
    } else {
      qe[key] = null;

      this.setQuery(qe);
    }
  }
}
