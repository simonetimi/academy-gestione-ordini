import { Component, inject, ViewChild } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductModalComponent } from '../../../../shared/components/modals/product-modal/product-modal.component';
import { Product } from '../../../../core/models/Product';
import { Client } from '../../../../core/models/Client';

// TODO DA FARE PER ULTIMO (prima client)

const ELEMENT_DATA_PLACEHOLDER: Client[] = [
  {
    id: 'c1',
    companyName: 'Enel',
    streetName: 'Via Milano 22',
    city: 'Milano',
    province: 'MI',
    nation: 'Italia',
  },
  {
    id: 'c2',
    companyName: 'Bartolini',
    streetName: 'Via Milano 22',
    city: 'Milano',
    province: 'MI',
    nation: 'Italia',
  },
  {
    id: 'c3',
    companyName: 'Nessuno',
    streetName: 'Via Milano 22',
    city: 'Milano',
    province: 'MI',
    nation: 'Italia',
  },
  {
    id: 'c4',
    companyName: 'BIC',
    streetName: 'Via Milano 22',
    city: 'Milano',
    province: 'MI',
    nation: 'Italia',
  },
  {
    id: 'c5',
    companyName: 'Baguette & CO',
    streetName: 'Via Milano 22',
    city: 'Milano',
    province: 'MI',
    nation: 'Italia',
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
    'companyName',
    'streetName',
    'city',
    'provinceAndNation',
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
    this.#modalService.openModal(ProductModalComponent).subscribe({
      next: (result) => console.log(result),
      // TODO chiama service se result esiste (per fare chiamata http/agg stato)
      //  result ? this.#stateService.addColleague(result) : null,
    });
  }

  onClickEdit(product: Product) {
    this.#modalService.openModal(ProductModalComponent, product).subscribe({
      next: (result) => console.log(result),
      // TODO chiama service se result esiste (per fare chiamata http/agg stato)
      //  result ? this.#stateService.addColleague(result) : null,
    });
  }

  // TODO prendi data source da servizio prodotti (chiamata http)
  // TODO aggiungi tasto per cambiare prezzo, iva, nome prodotto. mappa gli id per fare la chiamata!
  // TODO (continua) usa conditional rendering per vedere se una delle tab sta venendo utilizzata
}
