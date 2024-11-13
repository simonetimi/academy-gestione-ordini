import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../core/models/Product';
import { ModalService } from '../../../core/services/modal.service';
import { ProductModalComponent } from '../../../shared/components/modals/product-modal/product-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from '../../../core/services/products.service';

export const ELEMENT_DATA_PLACEHOLDER: Product[] = [
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
export class AdminComponent implements OnInit {
  #modalService: ModalService = inject(ModalService);
  displayedColumns: string[] = ['name', 'price', 'vat', 'edit', 'delete'];
  #productsService = inject(ProductsService);
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.#productsService.products.subscribe({
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
    this.#modalService.openModal(ProductModalComponent).subscribe({
      next: (result: Product | null) => {
        if (result) {
          this.#productsService.addProduct(result);
        }
      },
    });
  }

  onClickEdit(product: Product) {
    this.#modalService.openModal(ProductModalComponent, product).subscribe({
      next: (result) => {
        if (result) {
          this.#productsService.updateProduct(result);
        }
      },
    });
  }

  onClickDelete(product: Product) {
    this.#productsService.removeProduct(product);
  }
}
