import { Component, Input } from '@angular/core';

import { ReservationExerciseViewModel } from '../../models/booking.model';

@Component({
  selector: 'app-reservation-exercises',
  standalone: true,
  imports: [],
  templateUrl: './reservation-exercises.component.html',
  styleUrl: './reservation-exercises.component.scss',
})
export class ReservationExercisesComponent {
  @Input() exercises: ReservationExerciseViewModel[] = [];
}
