import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertInterface } from '../interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert$: Subject<AlertInterface> = new Subject();

  constructor() { }

  showMessage(message: AlertInterface): void {
    this.alert$.next(message);
  }
}
