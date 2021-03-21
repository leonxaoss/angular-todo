import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plain-button',
  templateUrl: './plain-button.component.html',
  styleUrls: ['./plain-button.component.scss']
})
export class PlainButtonComponent implements OnInit {

  @Input() classes = '';
  @Input() type = 'button';

  constructor() { }

  ngOnInit(): void {
  }

}
