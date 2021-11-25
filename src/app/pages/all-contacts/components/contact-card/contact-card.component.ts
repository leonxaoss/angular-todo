import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInterface } from '../../../../interfaces/user-interface';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  @Input() user: UserInterface = {} as UserInterface;
  @Output() newDeleteEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public onDelete(id: string): void {
    this.newDeleteEvent.emit(id);
  }

}
