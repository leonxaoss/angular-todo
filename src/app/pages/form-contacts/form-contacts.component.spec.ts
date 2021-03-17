import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormContactsComponent } from './form-contacts.component';

describe('FormContactsComponent', () => {
  let component: FormContactsComponent;
  let fixture: ComponentFixture<FormContactsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
