import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailsContactComponent } from './details-contact.component';

describe('DetailsContactComponent', () => {
  let component: DetailsContactComponent;
  let fixture: ComponentFixture<DetailsContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
