import {Component, Input, OnInit} from '@angular/core';
import {state, style, trigger} from "@angular/animations";

export const AnimationDataUpdate = trigger('dataUpdate', [
  state('0', style({
    transform: 'translateY(0)'
  })),
  state('1', style({
    transform: 'translateY(-40px)'
  })),
  state('2', style({
    transform: 'translateY(-80px)'
  })),
  state('3', style({
    transform: 'translateY(-120px)'
  })),
  state('4', style({
    transform: 'translateY(-160px)'
  })),
  state('5', style({
    transform: 'translateY(-200px)'
  })),
  state('6', style({
    transform: 'translateY(-240px)'
  })),
  state('7', style({
    transform: 'translateY(-280px)'
  })),
  state('8', style({
    transform: 'translateY(-320px)'
  })),
  state('9', style({
    transform: 'translateY(-360px)'
  })),
])
@Component({
  selector: 'app-number-scroll',
  templateUrl: './number-scroll.component.html',
  styleUrls: ['./number-scroll.components.less'],
  animations: [AnimationDataUpdate]
})
export class NumberScrollComponent implements OnInit {

  numberList:ScrollNumber[] = [];

  _number;
  @Input()
  set number(value) {
    // this.numberList = [];
    // this._number = value;
    // const numberStr = value.toString();
    // const numberList = numberStr.split("");
    const _list = [];
    value.forEach(num => {
      const scrollNumber:ScrollNumber = this.getScrollStyle(num);
      _list.push(scrollNumber);
    })
    this.numberList = _list;
    console.log(this.numberList);

  }

  get number() {
    return this._number;
  }

  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.numberList[0].number = '9';
    // },3000);
  }

  getScrollStyle(num):ScrollNumber {
    const _num = num === "." ? 11 : num === 0 ? 10 : num;
    const thisTop = -num * 40 + "px";
    // 'transform': 'translateY(' + scrollNumber.top +')',
    //   'transition': 'all 2s ease 0s',
    return {
      number:_num,
      style: {
        'transform':'translateY(' + thisTop+ ')',
        '-ms-transform': 'translateY(' + thisTop + ')',
        /* IE 9 */
        '-moz-transform': 'translateY(' + thisTop + ')',
        /* Firefox */
        '-webkit-transform': 'translateY(' + thisTop + ')',
        /* Safari 和 Chrome */
        '-o-transform': 'translateY(' + thisTop + ')',
        'transition': 'all 2s ease 0s'
      },
      top: thisTop
    };
  }

}

export interface ScrollNumber {
  number:string;
  style?: any;
  top: string;
}
