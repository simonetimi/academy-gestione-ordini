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

// TODO: MOSTRA PRODOTTI IVA IN: PRODOTTI (ADMIN), VIEW PRODOTTI MODAL, ORDINI

// TODO fix modifica utente non si riflette negli ordini:
//  fai refresh forzato == non della pagina, fai nuova richiesta http che aggiorni gli ordini.
//  fallo nel service, nella funzione che aggiorna gli utenti

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
    'totalPriceWithVat',
    'products',
    'client',
    'edit',
  ];

  #ordersService: OrdersService = inject(OrdersService);

  dataSource = new MatTableDataSource();
  noData = true;

  ngOnInit() {
    this.#ordersService.orders.subscribe({
      next: (value) => {
        this.dataSource.data = value;
        // se non ci sono dati, setta il valore hiddenTable a falso, per il rendering condizionale della tabella
        // mat-sorting non funziona con un tradizionale ngIf o @if
        if (this.dataSource.data.length > 0) {
          this.noData = false;
        }
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
    this.#modalService.openModal(ViewOrderProductsComponent, products);
  }

  onViewClient(client: Client) {
    this.#modalService.openModal(ViewClientModalComponent, client);
  }
}
