import { Component, inject } from '@angular/core';
import { Product } from '../../../core/models/Product';
import { ModalService } from '../../../core/services/modal.service';
import { ProductModalComponent } from '../../../shared/components/modals/product-modal/product-modal.component';
import { take } from 'rxjs';

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
  dataSource = ELEMENT_DATA_PLACEHOLDER;

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
