import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { ReservationEmptyStateComponent } from '../../components/reservation-empty-state/reservation-empty-state.component';
import { ReservationListComponent } from '../../components/reservation-list/reservation-list.component';
import { mapReservationsToDetailViewModel } from '../../mappers/reservation-detail.mapper';
import { ReservationDetailViewModel } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-reservation-detail-page',
  standalone: true,
  imports: [RouterLink, ReservationListComponent, ReservationEmptyStateComponent],
  templateUrl: './reservation-detail-page.component.html',
  styleUrl: './reservation-detail-page.component.scss',
})
export class ReservationDetailPageComponent implements OnInit {
  private readonly bookingService = inject(BookingService);

  readonly reservations = signal<ReservationDetailViewModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly cancellationMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadActiveReservations();
  }

  cancelReservation(reservationId: number): void {
    this.error.set(null);
    this.cancellationMessage.set(null);

    this.bookingService.cancelReservation(reservationId).subscribe({
      next: (reservations) => {
        this.reservations.set(mapReservationsToDetailViewModel(reservations));
        this.cancellationMessage.set('Reserva cancelada correctamente.');
      },
      error: () => {
        this.error.set('No pudimos cancelar la reserva. Intentá nuevamente.');
      },
    });
  }

  private loadActiveReservations(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.bookingService
      .getActiveReservations()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (reservations) => {
          this.reservations.set(mapReservationsToDetailViewModel(reservations));
        },
        error: () => {
          this.error.set('No pudimos cargar tus reservas activas. Intentá nuevamente.');
        },
      });
  }
}
