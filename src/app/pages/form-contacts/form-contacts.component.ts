import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.scss']
})
export class FormContactsComponent implements OnInit {

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


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  addContact(): void {
    ( this.form.get('contacts') as FormArray).push(
      new FormControl(null, Validators.required)
    );
  }
  removeContact(index: number): void {
    ( this.form.get('contacts') as FormArray).removeAt(index);
  }

  onSubmit(): void {

  }

}
