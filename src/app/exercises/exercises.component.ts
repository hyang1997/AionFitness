import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service';
@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [NgFor],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  workouts: any[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();
  }
}  


