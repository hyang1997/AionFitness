import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf,NgClass } from '@angular/common';
import { dbWriteService } from '../../db.write.service';
import { passwordMatchValidator } from '../../validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  mode: 'login' | 'register' = 'register'; // Start with 'register' by default
  form: FormGroup; // Declare form property
  verificationMessage: string | null = null;
  resetMessage: string | null = null;
  showPassword = false;
  rememberMe = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {
    // Initialize the form property here
    this.form = this.initializeForm(this.mode);
  }
  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
  }
  initializeForm(mode: 'login' | 'register'): FormGroup {
    if (mode === 'login') {
      return this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    } else {
      return this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }, { validators: passwordMatchValidator });
    }
  }

  setMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.form = this.initializeForm(mode); // Re-initialize the form based on the mode
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

onSubmit(): void {
  if (this.form.valid) {
    const rawForm = this.form.getRawValue();
    if (this.mode === 'register') {
      this.authService
        .register(rawForm.email, rawForm.username, rawForm.password)
        .subscribe(() => {
          this.verificationMessage = 'A verification email has been sent. Please check your inbox.';
        });
    } else {
      this.authService
        .login(rawForm.email, rawForm.password, this.rememberMe)
        .subscribe(() => {
          this.router.navigateByUrl('/');
        });
    }
  }
}

  resetPassword(): void {
    const email = this.form.get('email')?.value;
    if (email) {
      this.authService.resetPassword(email).subscribe(() => {
        this.resetMessage = 'A password reset email has been sent. Please check your inbox.';
      });
    }
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe(() => {
      this.router.navigate(['/home-page']);
    });
  }
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get username() {
    return this.form.get('username');
  }
}