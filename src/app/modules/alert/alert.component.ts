import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertInterface } from '../../interfaces/alert.interface';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  arrayMessage: {
    id: number;
    text: string;
    type: string;
  }[] = [];
  @ViewChild('alert') alertContainer: ElementRef | undefined;

  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.alertService.alert$.subscribe((message: AlertInterface) => {
      this.createMessage(message);
    });
  }

  createMessage(message: AlertInterface): void{
    const mess = {
      id: +(new Date().getTime()),
      text: message.text,
      type: message.type
    };
    this.arrayMessage.push(mess);
    setTimeout(() => {
      this.arrayMessage.shift();
    }, 5000);
  }

  removeMessage(id: number): void {
    const ind = this.arrayMessage.findIndex(item => item.id === id);
    this.arrayMessage.splice(ind, 1);
  }

}
