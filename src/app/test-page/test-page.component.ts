import { Component } from '@angular/core';
import { dbWriteService } from '../../db.write.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {
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
  async testGetUserRole(){
    const userId = this.authService.getUID();
    if (userId){
      console.log(this.dbWriteService.getUserRole(userId));
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
  
}
