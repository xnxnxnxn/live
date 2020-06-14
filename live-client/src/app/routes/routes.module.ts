import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { MapComponent } from './map/map.component';
import { LiveComponent } from './live/live.component';
import {NgxAmapModule} from "ngx-amap";
import {NgZorroAntdModule} from "ng-zorro-antd";

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
