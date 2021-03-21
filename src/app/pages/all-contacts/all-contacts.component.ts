import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user-interface';
import { MatDialog } from '@angular/material/dialog';
import { DeleteContactDialogComponent } from '../../component/delete-contact-dialog/delete-contact-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit, OnDestroy {
  contactsModel: UserInterface[] = [] as UserInterface[];
  contactsModelHelp: UserInterface[] = [];
  groupsArr: string[] = [];
  groupsArrView = new Set();
  queryParams = this.activateRoute.snapshot.queryParams;
  private isObservablesAlive = true;

  constructor(private userService: UserService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.userService.getAllUsers()
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((response: UserInterface[]) => {
        this.contactsModel = response;
        this.contactsModel.forEach(item => {
          if (item.group) {
            this.groupsArrView.add(item.group);
          }
        });
        console.log(this.groupsArrView);

        // if (this.queryParams.group1 || this.queryParams.group2) {
        //   this.contactsModel = response.filter((item: UserInterface) => {
        //     let isElem = false;
        //     for (const key in this.queryParams) {
        //       if (this.queryParams.hasOwnProperty(key) && (this.queryParams[key] === item.group) ) {
        //         isElem = true;
        //       }
        //     }
        //     return isElem;
        //   });
        // } else {
        //   this.contactsModel = response;
        // }

      });




    // this.activateRoute.queryParams
    //   .pipe(takeWhile(() => this.isObservablesAlive))
    //   .subscribe((params: Params) => {
    //     // console.log(params.groups);
    //     if (params.groups) {
    //       this.groupsArr = params.groups.split(',');
    //       // console.log(this.groupsArr);
    //     }
    //   });


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
    console.log(this.groupsArr);
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
      this.contactsModel = newItems;
  }
}
