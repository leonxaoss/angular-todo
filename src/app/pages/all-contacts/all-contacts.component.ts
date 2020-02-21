import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormInterface } from '../../interfaces/form-interface';
import { MatDialog } from '@angular/material';
import { DeleteContactDialogComponent } from '../../component/delete-contact-dialog/delete-contact-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { group } from '@angular/animations';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {

  data: FormInterface[] = [];

  constructor(private FormSer: FormService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.FormSer.getAll().subscribe((response: FormInterface[]) => {
      this.data = response;
    });

    // const filterQuery = (obj) => {
    //   return (item) => {
    //     return obj.group1 === item.group;
    //   };
    // };

    this.activateRoute.queryParams
      .subscribe(params => {
        // console.log(params);
        // this.data = this.data.filter((item) => {
        //   return item.group === params.group1;
        // });

        // this.FormSer.getAll().subscribe((response: FormInterface[]) => {
        //   this.data = response;
        // });

        const add = this.data.filter((item) => {
          let isElem = false;
          for (const key in params) {
            if (params[key] === item.group) {
              isElem = true;
            }
          }
          return isElem;
        });

        this.data = add;
        console.log(add);
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
        relativeTo: this.activateRoute,
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
