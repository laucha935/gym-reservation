import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IntBooking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  @Input() booking: IntBooking | null = null;
  @Input() isReserved = false;

  @Output() bookingReserved = new EventEmitter<IntBooking>();

  reserveBooking(): void {
    if (!this.booking) {
      return;
    }

    this.bookingReserved.emit(this.booking);
  }
}
