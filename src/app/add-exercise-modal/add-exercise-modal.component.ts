import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { WorkoutService } from '../workout.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-exercise-modal',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './add-exercise-modal.component.html',
  styleUrls: ['./add-exercise-modal.component.scss']
})
export class AddExerciseModalComponent extends BaseModalComponent implements OnInit {
  @Input() override showModal: boolean = false;
  @Output() workoutListChange = new EventEmitter<string[]>();
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  workoutList: any[] = [];
  constructor(private workoutService: WorkoutService) {
    super();
  }

  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.filteredWorkouts = this.workouts;
    this.workouts.forEach(workout => workout.selected = false);
  }
  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredWorkouts = this.workouts.filter(workout => workout.name.toLowerCase().includes(searchTerm));
    console.log(this.filteredWorkouts);
  }
  isAnyWorkoutSelected(){
    return this.workouts.some(workout => workout.selected);
  }
  toggleSelection(index: number): void {
    this.workouts[index].selected = !this.workouts[index].selected;
    if (this.workouts[index].selected) {
      // Add to list if selected
      this.workoutList.push(this.workouts[index].name);
    } else {
      // Remove from list if deselected
      const workoutName = this.workouts[index].name;
      this.workoutList = this.workoutList.filter(name => name !== workoutName);
    }
  }
  
  updateContent(content: string) {
    this.modalContent = content; // Assuming modalContent is defined in BaseModalComponent
  }

  addSelectedWorkouts(): void {
    this.workoutListChange.emit(this.workoutList);
    this.closeModal();
  }
  filterByBodyPart(): void {
    // Implement your filtering logic for body part here
    // Example: this.filteredWorkouts = this.workouts.filter(workout => workout.bodyPart === 'someBodyPart');
  }

  filterByCategory(): void {
    // Implement your filtering logic for category here
    // Example: this.filteredWorkouts = this.workouts.filter(workout => workout.category === 'someCategory');
  }
}
