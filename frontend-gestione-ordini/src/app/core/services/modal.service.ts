import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  materialDialogService = inject(MatDialog);

  openModal(component: ComponentType<unknown>, data: any = null) {
    return this.materialDialogService.open(component, { data }).afterClosed();
  }
}
