import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bookings',
    pathMatch: 'full',
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./pages/booking-page/booking-page.component').then((m) => m.BookingPageComponent),
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./pages/reservation-detail-page/reservation-detail-page.component').then(
        (m) => m.ReservationDetailPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'bookings',
  },
];
