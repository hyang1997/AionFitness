import { Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { StartWorkoutComponent } from './start-workout/start-workout.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { TemplateComponent } from './template/template.component';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { AdminGuard } from './admin.guard';
export const routes: Routes = [
    {path: '', redirectTo: 'home-page', pathMatch: 'full' },
    {path: 'history', component :HistoryComponent, canActivate:[AuthGuard]},
    {path: 'start-workout', component: StartWorkoutComponent, canActivate:[AuthGuard]},
    {path: 'exercises', component: ExercisesComponent, canActivate:[AuthGuard]},
    {path: 'template', component:TemplateComponent, canActivate:[AuthGuard]},
    {path: 'home-page', component:HomePageComponent, canActivate:[AuthGuard]},
    {path: 'test-page', component:TestPageComponent, canActivate:[AdminGuard]},
    { path: '**', redirectTo: '' }
];
