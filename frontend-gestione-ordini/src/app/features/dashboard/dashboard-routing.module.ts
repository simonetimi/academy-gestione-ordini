import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { OperatorComponent } from './operator/operator.component';
import {AuthGuardAdminService} from '../../core/guards/auth-guard-admin.service';
import {AuthGuardOperatorService} from '../../core/guards/auth-guard-operator.service';

const routes: Route[] = [

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardAdminService],
  },
  {
    path: 'operator',
    component: OperatorComponent,
    canActivate: [AuthGuardOperatorService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
