import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormInterface } from '../../interfaces/form-interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteContactDialogComponent } from '../../component/delete-contact-dialog/delete-contact-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.scss']
})
export class DetailsContactComponent implements OnInit {

  id = +this.activeRoute.snapshot.params.id;
  data: FormInterface = {
    id: 0,
    name: '',
    lname: '',
    contacts: [],
    date: '',
    more: ''
  };

  constructor( private formService: FormService,
               private activeRoute: ActivatedRoute,
               private router: Router,
               public dialog: MatDialog) { }

  ngOnInit() {
    this.activeRoute.params
      .subscribe((params: Params) => {
        this.id = +params.id;
      });

    this.formService
      .getById(this.id)
      .subscribe((item: FormInterface) => {
        this.data = item;
      });
  }

  deleteContact(id: number) {
    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(((result) => {
      if (result) {
        this.formService.deleteNode(id).subscribe();
        this.router.navigate(['/all-contacts']);
      }
    }));
  }

}
