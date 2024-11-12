import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminComponent } from './admin/admin.component';
import { OperatorComponent } from './operator/operator.component';
import { OrdersComponent } from './operator/orders/orders.component';
import { ClientsComponent } from './operator/clients/clients.component';

@NgModule({
  declarations: [
    AdminComponent,
    OperatorComponent,
    OrdersComponent,
    ClientsComponent
  ],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
