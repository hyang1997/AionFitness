import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { StartWorkoutComponent } from './start-workout/start-workout.component';
import { CommonModule, NgIf } from '@angular/common';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';
import { RegisterComponent } from "./register/register.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { dbWriteService } from '../db.write.service';
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
    CommonModule,
    RegisterComponent,
    NgIf,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aionfitness';
  showModal: boolean = false;
  modalContent: string = '';

  constructor(
    private authService: AuthService,
    private dbWriteService:dbWriteService) {}

  async testSetRecord(){
    await this.dbWriteService.updateWeightRecord(this.authService.getUID(),'0Dfuvza8Mlr7uPp2kDKQ', 123.5)
  }
  async testRecord(){
    await this.dbWriteService.getWeightRecordByName(this.authService.getUID(), "Bent-Over Row")
  }
  async testDb(){
    await this.dbWriteService.IntializeWorkoutData(this.authService.getUID());   
  }
  async testSaveSession() {
    const sessionData = {
      exercises: [
        { exerciseId: 'squat', reps: 10, weight: 100 },
        { exerciseId: 'bench_press', reps: 8, weight: 80 }
      ]
    };
    const userId = this.authService.getUID();
    if (userId){
      await this.dbWriteService.saveSession(userId, sessionData);
    }
  }

  async testGetLatestSession(){
    const userId = this.authService.getUID();
    if (userId) {
      this.dbWriteService.getLatestExerciseData(userId, 'squat')
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error('Error fetching exercise data:', error);
        });
    } else {
      console.error('User ID is null.');
    }
  }
  async testSaveTemplate() {
    const exercises = [
      { exerciseId: 'squat', name: 'Squat' },
      { exerciseId: 'bench_press', name: 'Bench Press' }
    ];
    const userId = 'USER_ID'; // Replace with actual user ID
    const templateName = 'Strength Training';
    await this.dbWriteService.saveTemplate(userId, templateName, exercises);
  }
  async testAddExercise(){
    const exercise = 'meme press';
    const userId = 'user';
    const bodyPart = 'titties';
    await this.dbWriteService.addExercise(this.authService.getUID(), exercise,bodyPart);
  }
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  openModal(workout: any) {
    this.modalContent = workout.description;
    this.showModal = true;
    console.log('Open modal:', workout);
  }

  closeModal() {
    this.showModal = false;
  }
  
}
