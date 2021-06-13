import { Component, OnInit } from '@angular/core';
import { FlatInterface } from './shared/interfaces/flat.interface';
import { FlatEnum } from './shared/enums/flat.enum';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-builders',
  templateUrl: './builders.component.html',
  styleUrls: ['./builders.component.scss']
})
export class BuildersComponent implements OnInit {

  flatEnum = FlatEnum;

  form = this.fb.group({
    rooms: [null, Validators.required],
    square: [null, Validators.required],
    price1square: [null, Validators.required]
  });

  flats: FlatInterface[] = [
    {
      rooms: '3',
      square: 78.8,
      price1square: 760
    },
    {
      rooms: '2',
      square: 64.1,
      price1square: 760
    },
    {
      rooms: '2',
      square: 64.1,
      price1square: 770
    },
    {
      rooms: '2',
      square: 57.2,
      price1square: 800
    },
    {
      rooms: '2',
      square: 62.8,
      price1square: 780
    },
    {
      rooms: '1',
      square: 43,
      price1square: 780
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  calcPriceForFlat(flat: FlatInterface, percentPrice = 0): number {
    return flat.square * (flat.price1square + percentPrice);
  }

  calcPriceFor1m(flat: FlatInterface, percentPrice = 0): number {
   return  flat.price1square + percentPrice;
  }

  calcPercent(percentPrice: number): number {
    return ((100 - percentPrice) * 0.01);
  }

  calcFirstDeposit(flat: FlatInterface, percentPrice = 0): number {
    return this.calcPriceForFlat(flat, percentPrice) * this.calcPercent(percentPrice);
  }

  calcBalanceForFlat(flat: FlatInterface, percentPrice = 0): number {
    return this.calcPriceForFlat(flat, percentPrice) - this.calcFirstDeposit(flat, percentPrice);
  }

  calcBalanceForFlat30Month(flat: FlatInterface, percentPrice = 0): number {
    return this.calcBalanceForFlat(flat, percentPrice) / 30;
  }

}
