import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeaveFormDialogComponent } from './leave-form-dialog.component';

describe('LeaveFormDialogComponent', () => {
  let component: LeaveFormDialogComponent;
  let fixture: ComponentFixture<LeaveFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
