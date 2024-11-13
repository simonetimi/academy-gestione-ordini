import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { OperatorComponent } from './operator/operator.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';
import {AuthGuardServiceRole} from '../../core/guards/auth-guard-role.service';

const routes: Route[] = [

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'operator',
    component: OperatorComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
