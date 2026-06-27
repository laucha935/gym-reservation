import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { IntBooking } from '../models/booking.model';

export const BOOKINGS_MOCK: IntBooking[] = [
  {
    id: 1,
    className: 'Yoga',
    instructor: 'Laura Gomez',
    schedule: 'Lunes 18:00',
    availableSpots: 10,
  },
  {
    id: 2,
    className: 'Crossfit',
    instructor: 'Martin Perez',
    schedule: 'Martes 19:30',
    availableSpots: 6,
  },
  {
    id: 3,
    className: 'Spinning',
    instructor: 'Sofia Ramirez',
    schedule: 'Miercoles 20:00',
    availableSpots: 8,
  },
  {
    id: 4,
    className: 'Pilates',
    instructor: 'Camila Torres',
    schedule: 'Jueves 17:30',
    availableSpots: 4,
  },
];

export const mockBookingsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === '/bookings') {
    return of(new HttpResponse<IntBooking[]>({ status: 200, body: BOOKINGS_MOCK })).pipe(delay(500));
  }

  return next(req);
};
