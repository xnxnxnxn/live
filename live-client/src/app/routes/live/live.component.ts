import {Component, OnInit} from '@angular/core';
import * as G2 from "@antv/g2";
import {Chart} from "@antv/g2";

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styles: []
})
export class LiveComponent implements OnInit {
  number = 8;

  constructor() {
  }

  ngOnInit(): void {
    this.render();
    this.render2();
  }

  change() {
    this.number++;
  }

  change2() {
    this.number--;
  }

  render() {
    const data = [
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ];

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.data(data);
    chart.scale({
      month: {
        range: [0, 1],
      },
      temperature: {
        nice: true,
      },
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.axis('temperature', {
      label: {
        formatter: (val) => {
          return val + ' °C';
        },
      },
    });

    chart
      .line()
      .position('month*temperature')
      .color('city')
      .shape('smooth');

    chart
      .point()
      .position('month*temperature')
      .color('city')
      .shape('circle');

    chart.render();


  }


  render2() {
    const data = [
      {title: "06-22 周一", count: 1, compareSymbol: "本周", compareSymbol2: "06-22 周一"},
      {title: "06-22 周一", count: 0, compareSymbol: "上周", compareSymbol2: "06-22 周一"},
      {title: "06-23", count: 1, compareSymbol: "本周", compareSymbol2: "06-23"},
      {title: "06-23", count: 1, compareSymbol: "上周", compareSymbol2: "06-23"},
      {title: "06-24", count: 0, compareSymbol: "本周", compareSymbol2: "06-24"},
      {title: "06-24", count: 1, compareSymbol: "上周", compareSymbol2: "06-24"},
      {title: "06-25", count: 1, compareSymbol: "本周", compareSymbol2: "06-25"},
      {title: "06-25", count: 1, compareSymbol: "上周", compareSymbol2: "06-25"},
      {title: "06-26", count: 0, compareSymbol: "本周", compareSymbol2: "06-26"},
      {title: "06-26", count: 2, compareSymbol: "上周", compareSymbol2: "06-26"},
      {title: "06-27", count: 0, compareSymbol: "本周", compareSymbol2: "06-27"},
      {title: "06-27", count: 5, compareSymbol: "上周", compareSymbol2: "06-27"},
      {title: "06-28", count: 0, compareSymbol: "本周", compareSymbol2: "06-28"},
      {title: "06-28", count: 11, compareSymbol: "上周", compareSymbol2: "06-28"}
    ];

    const chart = new Chart({
      container: 'container2',
      autoFit: true,
      height: 500,
    });


    chart.data(data);
    chart.scale({
      title: {
        range: [0, 1],
      },
      count: {
        nice: true,
      },
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.axis('count',{});

    chart
      .line()
      .position('title*count')
      .color('compareSymbol');

    chart
      .point()
      .position('title*count')
      .color('compareSymbol')
      .shape('circle');

    chart.render();



  }

}
