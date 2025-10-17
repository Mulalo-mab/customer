import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-edit-button',
  standalone: false,
  templateUrl: './edit-button.html',
  styleUrl: './edit-button.css'
})
export class EditButton implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onEdit() {
    if (this.params.onEditClick) {
      this.params.onEditClick(this.params.data);
    }
  }

  refresh(params: any): boolean {
    return false;
  }
}
