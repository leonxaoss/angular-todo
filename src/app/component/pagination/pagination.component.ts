import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy, OnChanges {

  @Input() items = [];
  @Input() itemInPage = -1;
  @Input() initialPage = 1;
  @Output() changePage = new EventEmitter<any>(true);

  currentPage = 1;
  private isObservablesAlive = true;
  totalPage = 0;
  pages: number[] = [];
  queryParams = this.activateRoute.snapshot.queryParams;
  private pageItem = 0;

  constructor(private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    if (!this.queryParams.page) {
      this.setPage(this.initialPage);
    }

    this.activateRoute.queryParams
      .pipe(takeWhile(() => this.isObservablesAlive))
      .subscribe((params: Params) => {
        this.currentPage = +params.page;
        if ((this.currentPage <= this.pages.length) && (this.currentPage > 0)) {
          this.changeData();
        } else {
          this.setPage(this.initialPage);
        }
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.pageItem = this.itemInPage;

    if (changes.items.currentValue !== changes.items.previousValue) {
      this.calcPage();
      this.changeData();
    }
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

  calcPage(): void {
    this.totalPage = Math.ceil(this.items.length / this.pageItem);
    this.pages = Array.from(Array((this.totalPage + 1) - 1).keys()).map(i => 1 + i);
  }

  changeData(): void {
    const startIndex = (this.currentPage - 1) * this.pageItem;
    let endIndex = startIndex + this.pageItem;
    if (+this.pageItem > this.items.length) {
      endIndex = this.items.length;
    }

    const pageItems = this.items.slice(startIndex, endIndex);

    this.changePage.emit(pageItems);
  }

  changeItemInPage(event: any): void {
    this.pageItem = +event.currentTarget.value;
    this.calcPage();
    this.changeData();
    this.setPage(1);
  }
}
