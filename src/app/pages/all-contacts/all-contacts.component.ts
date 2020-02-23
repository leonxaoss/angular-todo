import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormInterface } from '../../interfaces/form-interface';
import { MatDialog } from '@angular/material';
import { DeleteContactDialogComponent } from '../../component/delete-contact-dialog/delete-contact-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit, OnDestroy {
  contactsModel: FormInterface[] = [];
  contactsModelHelp: FormInterface[] = [];
  queryParams = this.activateRoute.snapshot.queryParams;
  private isObservablesAlive = true;

  constructor(private formService: FormService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {

    console.log(this.queryParams);

    this.formService.getAll()
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((response: FormInterface[]) => {
        this.contactsModelHelp = response;

        if (Object.keys(this.queryParams).length) {
          this.contactsModel = response.filter((item: FormInterface) => {
            let isElem = false;
            for (const key in this.queryParams) {
              if (this.queryParams.hasOwnProperty(key) && (this.queryParams[key] === item.group) ) {
                isElem = true;
              }
            }
            return isElem;
          });
        } else {
          this.contactsModel = response;
        }
      });




    this.activateRoute.queryParams
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((params: Params) => {
        console.log(params);
        if (Object.keys(params).length) {
          this.contactsModel = this.contactsModelHelp.filter((item: FormInterface) => {
            let isElem = false;
            for (const key in params) {
              if (params.hasOwnProperty(key) && (params[key] === item.group) ) {
                isElem = true;
              }
            }
            return isElem;
          });
        } else {
          this.contactsModel = this.contactsModelHelp;
        }
      });


  }

  ngOnDestroy(): void {
    this.isObservablesAlive = false;
  }

  deleteBlock(id: number) {

    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(((result) => {
        if (result) {
          this.formService.deleteNode(id)
            .subscribe(() => {
              this.contactsModel = this.contactsModel.filter(item => item.id !== id);
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
