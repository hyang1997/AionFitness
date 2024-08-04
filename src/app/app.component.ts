import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { StartWorkoutComponent } from './start-workout/start-workout.component';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HistoryComponent,
    RouterLink,
    BaseModalComponent,
    RouterLinkActive,
    StartWorkoutComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showModal: boolean = false;
  modalContent: string = '';
  workouts = [
    { id: 1, name: 'Squat', description: 'Squats are great for leg strength.' },
    { id: 2, name: 'Bench Press', description: 'Bench presses are great for chest strength.' }
  ];

  openModal(workout: any) {
    this.modalContent = workout.description;
    this.showModal = true;
    console.log('Open modal:', workout);
  }

  closeModal() {
    this.showModal = false;
  }

  logToConsole() {
    console.log('Button clicked');
  }
}
