import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user-interface';
import { MatDialog } from '@angular/material/dialog';
import { DeleteContactDialogComponent } from '../../component/delete-contact-dialog/delete-contact-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit, OnDestroy {
  contactsModel: UserInterface[] = [] as UserInterface[];
  contactsModelFilter: UserInterface[] = [];
  contactsModelHelp: UserInterface[] = [];
  groupsArr: string[] = [];
  groupsArrView = new Set();
  queryParams = this.activateRoute.snapshot.queryParams;
  private isObservablesAlive = true;
  showLoader = false;

  constructor(private userService: UserService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              public dialog: MatDialog,
              private alertService: AlertService,
              ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.userService.getAllUsers()
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((response: UserInterface[]) => {
        this.contactsModel = response;
        this.contactsModelFilter = response;
        this.contactsModelHelp = response;
        this.contactsModel.forEach(item => {
          if (item.group) {
            this.groupsArrView.add(item.group);
          }
          this.showLoader = false;
        });
        console.log(this.groupsArrView);
      });
  }

  ngOnDestroy(): void {
    this.isObservablesAlive = false;
  }

  deleteBlock(id: string): void {

    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(((result) => {
        if (result) {
          this.userService.deleteUser(id)
            .subscribe(() => {
              this.alertService.showMessage({text: 'Контакт успішно видалений', type: 'success'});
              this.contactsModel = this.contactsModel.filter(item => item.id !== id);
            });
        }
      }));

  }

  changeFilter(event: any): void {
    const value: string = event.currentTarget.value;
    const arr = new Map();
    this.groupsArr.forEach(item => {
      arr.set(item, item);
    });

    if (event.currentTarget.checked) {
      arr.set(value, value);
    } else {
      arr.delete(value);
    }

    this.groupsArr = Array.from(arr.keys());
    // console.log(this.groupsArr);
    this.contactsModelFilter = this.filterArray();
  }

  filterArray(): UserInterface[] {
    if (!this.groupsArr.length) {
      return this.contactsModel;
    }
    return this.contactsModel
      .filter((user: UserInterface) => user.group ? this.groupsArr.includes(user.group) : false);
  }

  // setQuery(queryParam: object): void {
  //   this.router.navigate(
  //     [],
  //     {
  //       relativeTo: this.activateRoute,
  //       queryParams: queryParam,
  //       queryParamsHandling: 'merge'
  //     }
  //   );
  // }
  //
  // changeQuery(event: any): void {
  //   const value: string = event.currentTarget.value;
  //   const qe = {
  //     groups: 'Family,Friend'
  //   };
  //   console.log(value);
  //
  //   if (event.currentTarget.checked) {
  //     this.setQuery(qe);
  //   } else {
  //     // qe[key] = null;
  //     this.setQuery(qe);
  //   }
  // }

  changePage(newItems: UserInterface[]): void {
      this.contactsModelHelp = newItems;
  }
}
