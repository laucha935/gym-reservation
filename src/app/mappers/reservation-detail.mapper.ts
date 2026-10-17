import {
  IntBooking,
  ProposedExercise,
  ReservationDetailViewModel,
  ReservationExerciseViewModel,
} from '../models/booking.model';

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export function mapReservationsToDetailViewModel(
  reservations: IntBooking[]
): ReservationDetailViewModel[] {
  return reservations.map(mapReservationToDetailViewModel);
}

export function mapReservationToDetailViewModel(
  reservation: IntBooking
): ReservationDetailViewModel {
  return {
    id: reservation.id,
    className: reservation.className,
    instructor: reservation.instructor,
    dateLabel: formatDate(reservation.date),
    timeLabel: formatTimeRange(reservation),
    durationLabel: formatDuration(reservation.durationMinutes),
    statusLabel: reservation.status === 'cancelled' ? 'Cancelada' : 'Activa',
    canCancel: reservation.status !== 'cancelled',
    exercises: (reservation.exercises ?? []).map(mapExerciseToViewModel),
  };
}

function mapExerciseToViewModel(exercise: ProposedExercise): ReservationExerciseViewModel {
  return {
    id: exercise.id,
    name: exercise.name,
    description: exercise.description ?? 'Sin descripcion adicional.',
    muscleGroup: exercise.muscleGroup ?? 'General',
    estimatedTimeLabel: exercise.estimatedMinutes
      ? `${exercise.estimatedMinutes} min`
      : 'Tiempo a definir',
  };
}

function formatDate(date?: string): string {
  if (!date) {
    return 'Fecha a confirmar';
  }

  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

function formatTimeRange(reservation: IntBooking): string {
  if (reservation.startTime && reservation.endTime) {
    return `${reservation.startTime} a ${reservation.endTime}`;
  }

  return reservation.schedule;
}

function formatDuration(durationMinutes?: number): string {
  return durationMinutes ? `${durationMinutes} minutos` : 'Duracion a confirmar';
}
