import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IntBooking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly http = inject(HttpClient);

  getBookings(): Observable<IntBooking[]> {
    return this.http.get<IntBooking[]>('/bookings');
  }
}
