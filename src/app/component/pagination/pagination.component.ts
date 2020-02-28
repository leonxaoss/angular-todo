import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { FormInterface } from '../../interfaces/form-interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

  @Input() items: FormInterface[];
  @Input() page = 3;

  currentPage: number;
  private isObservablesAlive = true;

  constructor(private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activateRoute.queryParams
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((params: Params) => {
        console.log(params);
        this.currentPage = +params.page;
      });

  }

  ngOnDestroy(): void {
    this.isObservablesAlive = false;
  }

  setPage(pageIndex: number): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activateRoute,
        queryParams: {
          page: pageIndex
        },
        queryParamsHandling: 'merge'
      }
    );
  }
}
