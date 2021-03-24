import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user-interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteContactDialogComponent } from '../../component/delete-contact-dialog/delete-contact-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, takeWhile } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.scss']
})
export class DetailsContactComponent implements OnInit, OnDestroy {

  id = this.activeRoute.snapshot.params.id;
  data: UserInterface = {} as UserInterface;
  isObservablesAlive = true;
  showLoader = false;

  constructor( private formService: UserService,
               private activeRoute: ActivatedRoute,
               private router: Router,
               private dialog: MatDialog,
               private alertService: AlertService,
               ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.activeRoute.params
      .pipe(
        switchMap(params => this.formService.getUserById(params.id)),
        takeWhile(() => this.isObservablesAlive)
      )
      .subscribe((item: UserInterface) => {
        // this.id = params.id;
        this.showLoader = false;
        console.log(item);
        this.data = item;
      });

    // this.formService
    //   .getUserById(this.id)
    //   .pipe(takeWhile(() => this.isObservablesAlive))
    //   .subscribe((item: UserInterface) => {
    //     this.data = item;
    //   });
  }

  deleteContact(id: string): void {
    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe(((result) => {
        if (result) {
          this.showLoader = true;
          this.formService.deleteUser(id)
            .subscribe(res => {
              this.showLoader = false;
              this.alertService.showMessage({text: 'Контакт успішно видалений', type: 'success'});
              this.router.navigate(['/all-contacts']);
            });
        }
    }));
  }

  ngOnDestroy(): void {
    this.isObservablesAlive = false;
  }
}
