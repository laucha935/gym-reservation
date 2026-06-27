import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IntBooking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
})
export class BookingListComponent {
  @Input() bookings: IntBooking[] = [];
  @Input() selectedBookingId: number | null = null;

  @Output() bookingSelected = new EventEmitter<IntBooking>();

  selectBooking(booking: IntBooking): void {
    this.bookingSelected.emit(booking);
  }
}
