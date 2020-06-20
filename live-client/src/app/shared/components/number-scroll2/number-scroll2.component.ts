import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-number-scroll2',
  templateUrl: './number-scroll2.component.html',
  styleUrls: ['./number-scroll2.components.less'
  ]
})
export class NumberScroll2Component implements OnInit, AfterViewInit, OnChanges {

  @Input()
  speed: number = 1000;
  @Input()
  num: string | number = '';
  @Input()
  iniAnimate = true;//是否要初始化动画效果
  @Input()
  symbol = ''; //默认的分割符号，千，万，千万
  @Input()
  dot = 0;//保留几位小数点
  @Input()
  pst = "";//是否有 百分号

  nHtml = '<div class="mt-number-animate-dom" style="width: 20px; text-align: center;float: left;position: relative; top: 0;" data-num="{{num}}">\
            <span style="width: 100%;float: left;">0</span>\
            <span style="width: 100%;float: left;">1</span>\
            <span style="width: 100%;float: left;">2</span>\
            <span style="width: 100%;float: left;">3</span>\
            <span style="width: 100%;float: left;">4</span>\
            <span style="width: 100%;float: left;">5</span>\
            <span style="width: 100%;float: left;">6</span>\
            <span style="width: 100%;float: left;">7</span>\
            <span style="width: 100%;float: left;">8</span>\
            <span style="width: 100%;float: left;">9</span>\
            <span style="width: 100%;float: left;">0</span>\
            <span style="width: 100%;float: left;">.</span>\
            <div></div>\
          </div>';

  html = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.num === null || this.num === undefined) {
      console.log('值不存在');
      return;
    }
    this.html = this.setNumDom(this.numToAr(this.num));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['num'] && !changes['num']['firstChange']) {
      this.resetData();
    }
  }


  ngAfterViewInit(): void {
    this.runAnimate();
  }

  resetData() {
    const newArr = this.numToAr(this.num);
    const list: HTMLCollectionOf<Element> = document.getElementsByClassName('mt-number-animate-dom');
    if (list.length !== newArr.length) {
      this.html = this.setNumDom(newArr);
      const timer = setInterval(() => {
          if (list.length === newArr.length) {
            this.runAnimate();
            clearInterval(timer);
          }
      },50);
    } else {
      for (let i = 0; i < list.length; i++) {
        const item: Element = list.item(i);
        item.setAttribute("data-num", newArr[i]);
        this.runAnimate()
      }
    }

  }


  numToAr(num) {
    num = parseFloat(num).toFixed(this.dot);
    let arrStr;
    if (typeof (num) == 'number') {
      arrStr = num.toString().split("");
    } else {
      arrStr = num.split("");
    }
    return arrStr;
  }

  setNumDom(arrStr) {
    let shtml = '<div style=" font-family: 微软雅黑;' +
      'line-height: 40px;height: 40px;' +
      'font-size: 36px;' +
      'overflow: hidden;' +
      'display: inline-block;' +
      'position: relative;">';
    for (let i = 0, len = arrStr.length; i < len; i++) {
      if (i != 0 && (len - i) % 3 == 0 && this.symbol != "" && arrStr[i] != ".") {
        shtml += '<div style="width: 15px;line-height: 40px;float: left;text-align: center;">' + this.symbol + '</div>' + this.nHtml.replace("{{num}}", arrStr[i]);
      } else {
        shtml += this.nHtml.replace("{{num}}", arrStr[i]);
      }
    }
    if (this.pst) {
      shtml += '%</div>';
    } else {
      shtml += '</div>';
    }
    return shtml;
  }

  getCurrentTop(item: Element) {
    const transform = item['style']['transform'];
    if (transform) {
      const first = transform.indexOf('(');
      const last = transform.indexOf(')');
      return transform.substring(first + 1,last);
    } else {
      return '0px';
    }
  }

  runAnimate() {
    const list: HTMLCollectionOf<Element> = document.getElementsByClassName('mt-number-animate-dom');
    for (let i = 0; i < list.length; i++) {
      const item: Element = list.item(i);
      const dataNum = item.getAttribute("data-num");
      const currentTop = this.getCurrentTop(item);
      const spanHei = item.clientHeight / 12; //11为元素个数
      const nextTop = -dataNum * spanHei + "px";
      if (nextTop === currentTop) {
        continue;
      }
      if (this.iniAnimate) {
        item['style']['transform'] = 'translateY(' + nextTop + ')';
        item['style']['-ms-transform'] = 'translateY(' + nextTop + ')';
        item['style']['-moz-transform'] = 'translateY(' + nextTop + ')';
        item['style']['-webkit-transform'] = 'translateY(' + nextTop + ')';
        item['style']['-o-transform'] = 'translateY(' + nextTop + ')';
        item['style']['transition'] = this.speed / 1000 + 's';
        item['style']['-ms-transition'] = this.speed / 1000 + 's';
        item['style']['-moz-transition'] = this.speed / 1000 + 's';
        item['style']['-webkit-transition'] = this.speed / 1000 + 's';
        item['style']['-o-transition'] = this.speed / 1000 + 's';
      } else {
        this.iniAnimate = true;
        item['style']['top'] = nextTop;
      }
    }
  }


}
