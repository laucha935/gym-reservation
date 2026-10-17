import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [],
  templateUrl: './reservation-modal.component.html',
  styleUrl: './reservation-modal.component.scss',
})
export class ReservationModalComponent {
  @Input() message: string | null = null;

  @Output() modalClosed = new EventEmitter<void>();

  closeModal(): void {
    this.modalClosed.emit();
  }
}
