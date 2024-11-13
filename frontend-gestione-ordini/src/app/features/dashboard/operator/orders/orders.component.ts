import { Component, inject, ViewChild } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from '../../../../core/models/Order';
import { Client } from '../../../../core/models/Client';
import { ViewClientModalComponent } from '../../../../shared/components/modals/view-client-modal/view-client-modal.component';
import { OrderProduct } from '../../../../core/models/OrderProduct';
import { ViewOrderProductsComponent } from '../../../../shared/components/modals/view-order-products/view-order-products.component';
import { OrderModalComponent } from '../../../../shared/components/modals/order-modal/order-modal.component';
import { OrdersService } from '../../../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  #modalService: ModalService = inject(ModalService);
  displayedColumns: string[] = [
    'id',
    'date',
    'state',
    'totalPrice',
    'products',
    'client',
    'edit',
  ];

  #ordersService: OrdersService = inject(OrdersService);

  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.#ordersService.orders.subscribe({
      next: (value) => {
        this.dataSource.data = value;
      },
    });
  }

  @ViewChild(MatPaginator)
  paginator = null;

  @ViewChild(MatSort)
  sort = null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onClickAdd() {
    this.#modalService.openModal(OrderModalComponent).subscribe({
      next: (result: Order | null) => {
        if (result) {
          this.#ordersService.addOrder(result);
        }
      },
    });
  }

  onClickEdit(order: Order) {
    this.#modalService.openModal(OrderModalComponent, order).subscribe({
      next: (result: Order | null) => {
        if (result) {
          this.#ordersService.updateOrder(result);
        }
      },
    });
  }

  onViewProducts(products: OrderProduct[]) {
    // TODO: PRODUCTS UNDEFINED
    console.log(products);
    this.#modalService.openModal(ViewOrderProductsComponent, products);
  }

  onViewClient(client: Client) {
    this.#modalService.openModal(ViewClientModalComponent, client);
  }
}
