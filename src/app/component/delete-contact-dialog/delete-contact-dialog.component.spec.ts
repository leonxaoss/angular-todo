import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteContactDialogComponent } from './delete-contact-dialog.component';

describe('DeleteContactDialogComponent', () => {
  let component: DeleteContactDialogComponent;
  let fixture: ComponentFixture<DeleteContactDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
