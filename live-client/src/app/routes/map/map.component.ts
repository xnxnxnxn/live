import { Component, OnInit } from '@angular/core';
import {AmapPluginLoaderService} from 'ngx-amap';
// @ts-ignore
import Geocoder = AMap.Geocoder;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [
    './map.component.less'
  ]
})
export class MapComponent implements OnInit {
  // 使用 naReady 事件输出的 AMap 原生对象:
  amap: AMap.Map;

  markerList = [
    [121.656983, 29.780695],
    [121.641172, 29.76966]
  ];

  // @ts-ignore
  geocoder: AMap.Geocoder;

  infoWindowOffset = {
    x: 0,
    y: -30,
  };
  constructor(private plugin: AmapPluginLoaderService) { }

  ngOnInit(): void {
  }

  onMapReady(amap: AMap.Map) {
    this.amap = amap;
    this.plugin.load('AMap.Geocoder').subscribe(() => {
      // @ts-ignore
      this.geocoder = new AMap.Geocoder({
        extensions: 'all'
      });
    });

  }

  zoomIn() {
    // 方法二：使用 naReady 事件输出的 AMap 原生对象:
    if (this.amap) {
      this.amap.zoomIn();
    }
  }

  getMarker(event) {
    console.log(event);
  }

  onEvent(event, type) {
    console.log('marker event:', type, event);
  }


  onMapEvent(event) {
    if (this.amap) {
      const marker = [event.lnglat.lng, event.lnglat.lat];
      this.markerList.push(marker);
      // 坐标 -----》 地址
      this.geocoder.getAddress(marker, (status: Geocoder.SearchStatus, result: Geocoder.BatchReGeocodeResult | string) => {
        if (status === 'complete' && result.regeocode) {
          const address = result.regeocode.formattedAddress;
          console.log(result);
        }else{
          console.log('解析坐标失败');
        }
      });

      // 地址 -----》  坐标
      this.geocoder.getLocation('浙江省宁波市鄞州区东钱湖陶公岛', (status: Geocoder.SearchStatus, result: Geocoder.GeocodeResult | string) => {
        if (status === 'complete' && result.geocodes.length) {
          // const address = result.regeocode.formattedAddress;
          console.log(result);
        }else{
          console.log(result);
          console.log('解析地址失败');
        }
      });
    }
  }

}
