import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IntBooking } from '../models/booking.model';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;
  let httpTestingController: HttpTestingController;

  const bookingsMock: IntBooking[] = [
    {
      id: 1,
      className: 'Yoga',
      instructor: 'Laura Gómez',
      schedule: 'Lunes 18:00',
      availableSpots: 10,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookingService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(BookingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get bookings from API', () => {
    service.getBookings().subscribe((bookings) => {
      expect(bookings).toEqual(bookingsMock);
      expect(bookings.length).toBe(1);
      expect(bookings[0].className).toBe('Yoga');
    });

    const request = httpTestingController.expectOne('/bookings');

    expect(request.request.method).toBe('GET');

    request.flush(bookingsMock);
  });

  it('should handle API error', () => {
    const errorMessage = 'Server error';

    service.getBookings().subscribe({
      next: () => fail('Expected an error, not bookings'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe(errorMessage);
      },
    });

    const request = httpTestingController.expectOne('/bookings');

    expect(request.request.method).toBe('GET');

    request.flush(null, {
      status: 500,
      statusText: errorMessage,
    });
  });
});
