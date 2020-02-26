import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormInterface } from '../../interfaces/form-interface';
import { FormService } from '../../services/form.service';
import { Observable } from 'rxjs';
import { LeaveFormDialogComponent } from './component/leave-form-dialog/leave-form-dialog.component';
import { MatDialog } from '@angular/material';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.scss']
})
export class FormContactsComponent implements OnInit, OnDestroy {

  id = +this.activeRoute.snapshot.params.id;
  isLeave = true;
  private isObservablesAlive = true;


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
              private formService: FormService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((params: Params) => {
        this.id = +params.id;
      });
    if (this.id) {
      this.formService
        .getById(this.id)
        .pipe(takeWhile(() => this.isObservablesAlive))
        .subscribe((item: FormInterface) => {
          this.form.patchValue ({
            name: item.name,
            lastName: item.lastName,
            date: item.date,
            more: item.more
          });
          this.phonesFormArray.clear();
          item.contacts.forEach((phone) => {
            this.phonesFormArray.push(new FormControl(phone.toString(), Validators.required));
          });
        });
    }
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

  onEdit(formData: FormInterface): void {
    this.formService
      .updateNode(this.id, formData)
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe(
        (data) => data,
        (err: ErrorEvent) => console.error(err),
        () => {
          this.navToContacts();
        });
  }

  onCreate(formData: FormInterface): void {
    this.formService
      .addData(formData)
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe(
        data => data,
        (err: ErrorEvent) => console.error(err),
        () => {
          this.navToContacts();
        });
  }

  onSubmit(): void {
    const model: FormInterface = {
      id: this.id,
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      contacts: this.form.value.contacts,
      group: this.form.value.group,
      date: this.form.value.date,
      more: this.form.value.more
    };

    if (this.form.valid) {
      this.isLeave = false;
      if (this.id) {
        this.onEdit(model);
      } else {
        this.onCreate(model);
      }
    } else {
      this.form.markAllAsTouched();
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
