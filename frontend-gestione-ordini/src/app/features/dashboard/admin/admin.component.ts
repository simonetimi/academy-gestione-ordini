import { Component, inject, ViewChild } from '@angular/core';
import { Product } from '../../../core/models/Product';
import { ModalService } from '../../../core/services/modal.service';
import { ProductModalComponent } from '../../../shared/components/modals/product-modal/product-modal.component';
import { take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const ELEMENT_DATA_PLACEHOLDER: Product[] = [
  {
    id: 'p1',
    name: 'Prodotto test 1',
    price: 100,
    vat: 22,
  },
  {
    id: 'p2',
    name: 'Prodotto test 2',
    price: 300,
    vat: 22,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
  {
    id: 'p3',
    name: 'Prodotto test 3',
    price: 5,
    vat: 10,
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  #modalService: ModalService = inject(ModalService);
  displayedColumns: string[] = ['name', 'price', 'vat', 'edit'];

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
    this.#modalService.openModal(ProductModalComponent).subscribe({
      next: (result) => {
        if (result) {
          console.log(
            'qui chiami il servizio stato + http! Vuol dire che la modale restituisce dati',
          );
        }
      },
      // TODO chiama service se result esiste (per fare chiamata http/agg stato)
      //  result ? this.#stateService.addColleague(result) : null,
    });
  }

  onClickEdit(product: Product) {
    this.#modalService.openModal(ProductModalComponent, product).subscribe({
      next: (result) => {
        if (result) {
          console.log(
            'qui chiami il servizio stato + http! Vuol dire che la modale restituisce dati',
          );
        }
      },
      // TODO chiama service se result esiste (per fare chiamata http/agg stato)
      //  result ? this.#stateService.addColleague(result) : null,
    });
  }

  // TODO prendi data source da servizio prodotti (chiamata http)
  // TODO aggiungi tasto per cambiare prezzo, iva, nome prodotto. mappa gli id per fare la chiamata!
  // TODO (continua) usa conditional rendering per vedere se una delle tab sta venendo utilizzata
}
