import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormInterface } from '../../interfaces/form-interface';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.scss']
})
export class FormContactsComponent implements OnInit {

  id = +this.activeRoute.snapshot.params.id;

  form: FormGroup = this.formBuilder.group({
    name: [null,
      [
        Validators.required
      ]
    ],
    lname: [null,
      [
        Validators.required
      ]
    ],
    date: [ null ],
    more: [ null ],
    contacts: this.formBuilder.array([
      [null, [Validators.required]]
    ]),
  });
  phonesFormArray = this.form.get('contacts') as FormArray;


  constructor(private formBuilder: FormBuilder,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private formService: FormService) { }

  ngOnInit() {
    this.activeRoute.params
      .subscribe((params: Params) => {
        this.id = +params.id;
      });
    if (this.id) {
      this.formService
        .getById(this.id)
        .subscribe((item: FormInterface) => {

          this.form.patchValue ({
            name: item.name,
            lname: item.lname,
            date: item.date,
            more: item.more
          });

          // this.phonesFormArray.patchValue(item.contacts);
          item.contacts.forEach((it) => {
            this.phonesFormArray.push(
              new FormControl(it, Validators.required)
            );
          });

        });
    }
  }

  addContact(): void {
    this.phonesFormArray.push(
      new FormControl(null, Validators.required)
    );
  }
  removeContact(index: number): void {
    this.phonesFormArray.removeAt(index);
  }

  navToSections(): void {
    this.router.navigate(['/all-contacts']);
  }

  onCreate(formData: FormInterface): void {
    this.formService
      .addData(formData)
      .subscribe(
        data => data,
        (err: ErrorEvent) => console.error(err),
        () => {
          this.navToSections();
        });
  }

  onSubmit(): void {
    const model: FormInterface = {
      id: this.id,
      name: this.form.value.name,
      lname: this.form.value.lname,
      contacts: this.form.value.contacts,
      date: this.form.value.date,
      more: this.form.value.more
    };

    console.log(this.form.value);

    if (this.form.valid) {
      // this.isLeave = false;
      if (this.id) {
        // this.onEdit(model);
      } else {
        this.onCreate(model);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

}
