import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../core/models/Product';
import { ModalService } from '../../../core/services/modal.service';
import { ProductModalComponent } from '../../../shared/components/modals/product-modal/product-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from '../../../core/services/products.service';

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
  hiddenTable = true;

  ngOnInit() {
    this.#productsService.products.subscribe({
      next: (value) => {
        this.dataSource.data = value;
        if (this.dataSource.data.length > 0) {
          this.hiddenTable = false;
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
      next: (result: Product | null) => {
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
