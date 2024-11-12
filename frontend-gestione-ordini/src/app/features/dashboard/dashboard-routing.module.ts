import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { OperatorComponent } from './operator/operator.component';

const routes: Route[] = [
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'operator',
    component: OperatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
