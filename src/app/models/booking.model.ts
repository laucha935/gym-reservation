export interface IntBooking {
  id: number;
  className: string;
  instructor: string;
  schedule: string;
  availableSpots: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
  status?: ReservationStatus;
  exercises?: ProposedExercise[];
}

export interface ProposedExercise {
  id: string;
  name: string;
  description?: string;
  muscleGroup?: string;
  estimatedMinutes?: number;
}

export type ReservationStatus = 'active' | 'cancelled';

export interface ReservationExerciseViewModel {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  estimatedTimeLabel: string;
}

export interface ReservationDetailViewModel {
  id: number;
  className: string;
  instructor: string;
  dateLabel: string;
  timeLabel: string;
  durationLabel: string;
  statusLabel: string;
  canCancel: boolean;
  exercises: ReservationExerciseViewModel[];
}
