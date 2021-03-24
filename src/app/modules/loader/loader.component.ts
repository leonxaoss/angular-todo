import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  @Input() id = '';
  @Input() local = false;
  @Input() showLoader = false;

  isObservablesAlive = true;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loader$
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((res) => {
        this.showLoader = res;
      });
  }

  ngOnDestroy(): void {
    this.isObservablesAlive = false;
  }

}
