import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { BookingDetailComponent } from '../../components/booking-detail/booking-detail.component';
import { BookingListComponent } from '../../components/booking-list/booking-list.component';
import { IntBooking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [BookingListComponent, BookingDetailComponent],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss',
})
export class BookingPageComponent implements OnInit {
  private readonly bookingService = inject(BookingService);

  readonly bookings = signal<IntBooking[]>([]);
  readonly selectedBooking = signal<IntBooking | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly reservedBookingId = signal<number | null>(null);
  readonly successMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadBookings();
  }

  selectBooking(booking: IntBooking): void {
    this.selectedBooking.set(booking);
    this.successMessage.set(null);
  }

  reserveBooking(booking: IntBooking): void {
    this.reservedBookingId.set(booking.id);
    this.successMessage.set(`Reserva confirmada para ${booking.className}.`);
  }

  private loadBookings(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.bookingService
      .getBookings()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (bookings) => {
          this.bookings.set(bookings);
        },
        error: () => {
          this.error.set('No pudimos cargar las reservas. Intenta nuevamente.');
        },
      });
  }
}
