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
    path: '**',
    redirectTo: 'bookings',
  },
];
