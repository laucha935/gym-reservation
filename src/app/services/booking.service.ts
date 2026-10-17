import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { IntBooking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly http = inject(HttpClient);
  private reservationsCache: IntBooking[] | null = null;

  getBookings(): Observable<IntBooking[]> {
    return this.http.get<IntBooking[]>('/bookings');
  }

  getActiveReservations(): Observable<IntBooking[]> {
    if (this.reservationsCache) {
      return of(this.getActiveReservationsFromCache());
    }

    return this.getBookings().pipe(
      tap((bookings) => {
        this.reservationsCache = bookings;
      }),
      map(() => this.getActiveReservationsFromCache())
    );
  }

  cancelReservation(reservationId: number): Observable<IntBooking[]> {
    if (!this.reservationsCache) {
      return this.getActiveReservations().pipe(
        tap(() => this.markReservationAsCancelled(reservationId)),
        map(() => this.getActiveReservationsFromCache())
      );
    }

    this.markReservationAsCancelled(reservationId);

    return of(this.getActiveReservationsFromCache());
  }

  private getActiveReservationsFromCache(): IntBooking[] {
    return (this.reservationsCache ?? []).filter((booking) => booking.status !== 'cancelled');
  }

  private markReservationAsCancelled(reservationId: number): void {
    this.reservationsCache = (this.reservationsCache ?? []).map((booking) =>
      booking.id === reservationId ? { ...booking, status: 'cancelled' } : booking
    );
  }
}
