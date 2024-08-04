import { Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { StartWorkoutComponent } from './start-workout/start-workout.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { TemplateComponent } from './template/template.component';
import { AddExerciseModalComponent } from './add-exercise-modal/add-exercise-modal.component';

export const routes: Routes = [
    {path: 'history', component :HistoryComponent},
    {path: 'start-workout', component: StartWorkoutComponent},
    {path: 'exercises', component: ExercisesComponent},
    {path: 'template', component:TemplateComponent}
];
