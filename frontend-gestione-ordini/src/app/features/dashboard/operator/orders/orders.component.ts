import { Component, inject, ViewChild } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductModalComponent } from '../../../../shared/components/modals/product-modal/product-modal.component';
import { Product } from '../../../../core/models/Product';
import { Order } from '../../../../core/models/Order';
import { Client } from '../../../../core/models/Client';
import { ViewClientModalComponent } from '../../../../shared/components/modals/view-client-modal/view-client-modal.component';
import { OrderProduct } from '../../../../core/models/OrderProduct';
import { ViewOrderProductsComponent } from '../../../../shared/components/modals/view-order-products/view-order-products.component';
import { OrderModalComponent } from '../../../../shared/components/modals/order-modal/order-modal.component';

// TODO DA FARE PER ULTIMO (prima client)

const ELEMENT_DATA_PLACEHOLDER: Order[] = [
  {
    id: 'o1',
    date: new Date(),
    state: 'IN_PROGRESS',
    totalPrice: 333,
    productsList: [
      {
        product: {
          id: 'p1',
          name: 'Prodotto test 1',
          price: 100,
          vat: 22,
        },
        quantity: 3,
      },
      {
        product: {
          id: 'p1',
          name: 'Prodotto test 2',
          price: 100,
          vat: 22,
        },
        quantity: 3,
      },
      {
        product: {
          id: 'p1',
          name: 'Prodotto test 3',
          price: 100,
          vat: 22,
        },
        quantity: 3,
      },
    ],
    client: {
      id: 'c1',
      companyName: 'Enel',
      streetName: 'Via Milano 22',
      city: 'Milano',
      province: 'MI',
      nation: 'Italia',
    },
  },
  {
    id: 'o2',
    date: new Date(),
    state: 'IN_PROGRESS',
    totalPrice: 333,
    productsList: [
      {
        product: {
          id: 'p1',
          name: 'Prodotto test 1',
          price: 100,
          vat: 22,
        },
        quantity: 3,
      },
    ],
    client: {
      id: 'c1',
      companyName: 'Enel',
      streetName: 'Via Milano 22',
      city: 'Milano',
      province: 'MI',
      nation: 'Italia',
    },
  },
  {
    id: 'o3',
    date: new Date(),
    state: 'COMPLETED',
    totalPrice: 1000.99,
    productsList: [
      {
        product: {
          id: 'p1',
          name: 'Prodotto test 1',
          price: 100,
          vat: 22,
        },
        quantity: 3,
      },
    ],
    client: {
      id: 'c3',
      companyName: 'Enel',
      streetName: 'Via Milano 22',
      city: 'Milano',
      province: 'MI',
      nation: 'Italia',
    },
  },
];

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

  // TODO PLACEHOLDER DATA!!!!!! PRENDI DAL SERVICE
  dataSource = new MatTableDataSource(ELEMENT_DATA_PLACEHOLDER);

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
      next: (result) => console.log(result),
      // TODO chiama service se result esiste (per fare chiamata http/agg stato)
      //  result ? this.#stateService.addColleague(result) : null,
    });
  }

  onClickEdit(order: Order) {
    this.#modalService.openModal(OrderModalComponent, order).subscribe({
      next: (result) => console.log(result),
      // TODO chiama service se result esiste (per fare chiamata http/agg stato)
      //  result ? this.#stateService.addColleague(result) : null,
    });
  }

  onViewProducts(products: OrderProduct[]) {
    this.#modalService.openModal(ViewOrderProductsComponent, products);
  }

  onViewClient(client: Client) {
    this.#modalService.openModal(ViewClientModalComponent, client);
  }

  // TODO prendi data source da servizio prodotti (chiamata http)
  // TODO aggiungi tasto per cambiare prezzo, iva, nome prodotto. mappa gli id per fare la chiamata!
  // TODO (continua) usa conditional rendering per vedere se una delle tab sta venendo utilizzata
}
