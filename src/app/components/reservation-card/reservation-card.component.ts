import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ReservationExercisesComponent } from '../reservation-exercises/reservation-exercises.component';
import { ReservationDetailViewModel } from '../../models/booking.model';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [ReservationExercisesComponent],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss',
})
export class ReservationCardComponent {
  @Input({ required: true }) reservation!: ReservationDetailViewModel;

  @Output() reservationCancelled = new EventEmitter<number>();

  cancelReservation(): void {
    if (!this.reservation.canCancel) {
      return;
    }

    this.reservationCancelled.emit(this.reservation.id);
  }
}
