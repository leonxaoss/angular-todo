import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  public loader$ = new Subject<boolean>();

  setLoader(data: boolean): void {
    this.loader$.next(data);
  }
}
