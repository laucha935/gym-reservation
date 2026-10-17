import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { ReservationDetailViewModel } from '../../models/booking.model';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [ReservationCardComponent],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent {
  @Input() reservations: ReservationDetailViewModel[] = [];

  @Output() reservationCancelled = new EventEmitter<number>();

  cancelReservation(reservationId: number): void {
    this.reservationCancelled.emit(reservationId);
  }
}
