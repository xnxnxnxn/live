import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {NgxAmapModule} from 'ngx-amap';
// single pages
import { CallbackComponent } from './callback/callback.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveComponent } from './live/live.component';
import { MapComponent } from './map/map.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { RouteRoutingModule } from './routes-routing.module';


const COMPONENTS = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,

];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule,
    NgZorroAntdModule,
    NgxAmapModule.forRoot({
      apiKey: '8503385d2aa12d671ab3d5f6b0f31c2e'
    })
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    MapComponent,
    LiveComponent
  ],
})
export class RoutesModule {}
