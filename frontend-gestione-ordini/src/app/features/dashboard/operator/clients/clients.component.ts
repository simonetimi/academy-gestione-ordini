import { Component, inject, ViewChild } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Client } from '../../../../core/models/Client';
import { ClientModalComponent } from '../../../../shared/components/modals/client-modal/client-modal.component';
import { ClientsService } from '../../../../core/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  #modalService: ModalService = inject(ModalService);
  displayedColumns: string[] = [
    'companyName',
    'streetName',
    'city',
    'provinceAndNation',
    'edit',
  ];
  #clientsService: ClientsService = inject(ClientsService);

  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.#clientsService.clients.subscribe({
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
    this.#modalService.openModal(ClientModalComponent).subscribe({
      next: (result: Client | null) => {
        if (result) {
          this.#clientsService.addClient(result);
        }
      },
    });
  }

  onClickEdit(client: Client) {
    this.#modalService.openModal(ClientModalComponent, client).subscribe({
      next: (result: Client | null) => {
        if (result) {
          this.#clientsService.updateClient(result);
        }
      },
    });
  }
}
