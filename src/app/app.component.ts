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
import { TestPageComponent } from './test-page/test-page.component';
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
    MatIconModule,
    TestPageComponent
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
