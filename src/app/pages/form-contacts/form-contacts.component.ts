import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.scss']
})
export class FormContactsComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: [null,
      [
        Validators.required,
        Validators.minLength(5).bind(this),
        Validators.pattern(/^[A-Z0-9\\]+$/i)]
    ],
    // description: [null],
    // instructions: [null],
    // contacts: this.formBuilder.array([
    //   [null, [Validators.required]]
    // ]),
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(): void {

  }

}
