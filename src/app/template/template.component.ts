import { Component, ViewChild} from '@angular/core';
import { AddExerciseModalComponent } from '../add-exercise-modal/add-exercise-modal.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [AddExerciseModalComponent, RouterLink, 
    RouterOutlet, AddExerciseModalComponent, 
    NgFor, NgIf],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent {
  @ViewChild(AddExerciseModalComponent) addExerciseModal!: AddExerciseModalComponent;

  workoutList: string[] = [];

  showExerciseModal() {
    this.addExerciseModal.openModal();
  }

  hideExerciseModal() {
    this.addExerciseModal.closeModal();
  }

  changeExerciseContent(content: string) {
    this.addExerciseModal.updateContent(content);
  }
  onWorkoutListChange(updatedList: string[]): void {
    this.workoutList = updatedList;
  }
  addSet(workout: any): void {
    workout.sets.push({ previous: '', lbs: 0, reps: 0 });
  }

  removeSet(workout: any, index: number): void {
    workout.sets.splice(index, 1);
  }

  templateName = 'Template Name';
  notes = "notes"
  showModal: boolean = false;


}
