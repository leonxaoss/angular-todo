import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pag',
  templateUrl: './pag.component.html',
  styleUrls: ['./pag.component.scss']
})
export class PagComponent implements OnInit {

  itemsArr = new Array(113).fill(5).map((item, i) => 'Item ' + (i + 1));
  itemsArrOnPage = this.itemsArr;
  showLoader = true;

  constructor() { }

  ngOnInit(): void {
    this.showLoader = false;
  }

  changePage(items: []): void {
    // console.log(564, items);
    this.showLoader = false;
    this.itemsArrOnPage = items;
  }
}
