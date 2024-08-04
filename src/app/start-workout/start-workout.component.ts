import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Route, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-start-workout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './start-workout.component.html',
  styleUrl: './start-workout.component.scss'
})
export class StartWorkoutComponent {

}
