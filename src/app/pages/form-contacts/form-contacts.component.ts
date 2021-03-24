import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserInterface } from '../../interfaces/user-interface';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { LeaveFormDialogComponent } from './component/leave-form-dialog/leave-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, takeWhile } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.scss']
})
export class FormContactsComponent implements OnInit, OnDestroy {

  id = this.activeRoute.snapshot.params.id;
  isLeave = true;
  private isObservablesAlive = true;
  showLoader = false;


  form: FormGroup = this.formBuilder.group({
    name: [null,
      [
        Validators.required
      ]
    ],
    lastName: [null,
      [
        Validators.required
      ]
    ],
    date: [ null ],
    more: [ null ],
    group: [ null ],
    image: [''],
    contacts: this.formBuilder.array([
      [null, [
        Validators.required,
        Validators.minLength(9)
      ]]
    ]),
  });
  phonesFormArray = this.form.get('contacts') as FormArray;


  constructor(private formBuilder: FormBuilder,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private dialog: MatDialog,
              private alertService: AlertService,
              ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.activeRoute.params
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((params: Params) => {
        this.id = params.id;
      });
    console.log(this.form);
    if (!this.id) {
      this.showLoader = false;
      return;
    }
    this.userService
      .getUserById(this.id)
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((item: UserInterface) => {
        this.form.patchValue ({
          name: item.name,
          lastName: item.lastName,
          date: item.date,
          more: item.more,
          image: item.image,
          group: item.group
        });
        this.phonesFormArray.clear();
        item.contacts.forEach((phone) => {
          this.phonesFormArray.push(new FormControl(phone.toString(), Validators.required));
        });
        this.showLoader = false;
      });
  }

  ngOnDestroy(): void {
    this.isObservablesAlive = false;
  }

  addContact(): void {
    this.phonesFormArray.push(
      new FormControl(null, Validators.required)
    );
  }
  removeContact(index: number): void {
    this.phonesFormArray.removeAt(index);
  }

  navToContacts(): void {
    this.router.navigate(['/all-contacts']);
  }

  onEdit(formData: UserInterface): void {
    this.showLoader = true;
    this.userService
      .updateUser(this.id, formData)
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe(
        (data) => {
          this.showLoader = false;
          this.alertService.showMessage({text: 'Контакт успішно редагований', type: 'success'});
        },
        (err: ErrorEvent) => console.error(666, err),
        () => {
          this.navToContacts();
        });
  }

  onCreate(formData: UserInterface): void {
    this.showLoader = true;
    this.userService.addUser(formData)
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe(
        data => {
          this.showLoader = false;
          this.alertService.showMessage({text: 'Контакт успішно створений', type: 'success'});
          console.log(555, data);
        },
        (err: ErrorEvent) => console.error(err),
        () => {
          this.navToContacts();
        });
  }

  onSubmit(): void {

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const model: UserInterface = {
      ...this.form.value
    };

    this.isLeave = false;
    if (this.id) {
      this.onEdit(model);
    } else {
      this.onCreate(model);
    }
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.form.dirty && this.isLeave) {
      const dialogRef = this.dialog.open(LeaveFormDialogComponent, {
      });
      return dialogRef.afterClosed().pipe(
        map((result) => {
          return result;
        }));
    } else {
      return true;
    }
  }

}
