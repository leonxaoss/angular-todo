import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy, OnChanges {

  @Input() itemsArr: any[] = [];
  @Input() itemsInPage = [2, 5, 10, 50];
  @Input() initialPage = 1;
  @Input() viewPageFromCurrent = 2;
  @Output() changePage = new EventEmitter<any>(true);

  currentUrl = '';
  currentPage = 1;
  totalPage = 0;
  pagesNumbers: number[] = [];
  private itemsInPageSelected = this.itemsInPage[0];
  private isObservablesAlive = true;

  constructor(private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnChanges(): void {
    // this.itemsInPageSelected = this.itemsInPage[0];
    this.onPageChange();
    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    this.itemsInPageSelected = this.itemsInPage[0];
    this.currentUrl = this.router.url.split('?')[0];

    // if (!this.activateRoute.snapshot.queryParams) {
    //   this.setPage(this.initialPage);
    // }

    this.activateRoute.queryParams
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((params: Params) => {
        this.currentPage = +params.page;
        this.onPageChange();
      });
    this.onPageChange();
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

  calcPageItems(): void {
    this.totalPage = Math.ceil(this.itemsArr.length / this.itemsInPageSelected);
    // this.pagesNumbers = new Array(this.totalPage).fill(1).map((it, i) => i + 1);

    this.pagesNumbers = [];

    for (let i = this.currentPage - this.viewPageFromCurrent; i <= this.currentPage + this.viewPageFromCurrent; i++) {
      if (i > 0 && i <= this.totalPage) {
        this.pagesNumbers.push(i);
      }
    }
  }

  onPageChange(): void {
    if (!this.activateRoute.snapshot.queryParams.page) {
      this.setPage(this.initialPage);
    }
    this.calcPageItems();
    if (this.currentPage > this.totalPage) {
      this.setPage(1);
      return;
    }
    const startIndex = (this.currentPage - 1) * this.itemsInPageSelected;
    let endIndex = startIndex + this.itemsInPageSelected;
    if (+this.itemsInPageSelected > this.itemsArr.length) {
      endIndex = this.itemsArr.length;
    }

    const pageItems = this.itemsArr.slice(startIndex, endIndex);

    this.changePage.emit(pageItems);
    // this.changePage.emit({
    //   currentPage: this.currentPage,
    //   startIndex,
    //   endIndex,
    //   pageSize: this.itemsInPageSelected,
    // });
  }

  changeItemInPage(event: any): void {
    this.itemsInPageSelected = +event.currentTarget.value;
    this.onPageChange();
  }
}
