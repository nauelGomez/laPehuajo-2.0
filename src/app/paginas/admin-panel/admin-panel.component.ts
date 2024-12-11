import { Component } from '@angular/core';
import { ModalSubirPorductoComponent } from "../modal-subir-porducto/modal-subir-porducto.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [ModalSubirPorductoComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
