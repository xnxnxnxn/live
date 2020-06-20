import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styles: [
  ]
})
export class LiveComponent implements OnInit {
  number = 8;
  numberStr = this.number.toString().split("");
  constructor() { }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.number += 1;
    // },1000);
  }

  change() {
    this.number ++;
    // this.number += 478;
    // this.numberStr = this.number.toString().split("");
  }

  change2() {
    this.number --;
  }

}
