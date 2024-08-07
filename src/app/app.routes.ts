import { Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { StartWorkoutComponent } from './start-workout/start-workout.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { TemplateComponent } from './template/template.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
    {path: 'history', component :HistoryComponent, canActivate:[AuthGuard]},
    {path: 'start-workout', component: StartWorkoutComponent, canActivate:[AuthGuard]},
    {path: 'exercises', component: ExercisesComponent, canActivate:[AuthGuard]},
    {path: 'template', component:TemplateComponent, canActivate:[AuthGuard]},
    { path: '**', redirectTo: '' }
];
