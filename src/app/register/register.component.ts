import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { dbWriteService } from '../../db.write.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  mode: 'login' | 'register' = 'login';
  form: FormGroup;
  rememberMe = false;
  verificationMessage: string | null = null;
  resetMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dbWriteService: dbWriteService,
  ) {
      this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.initializeForm(this.mode);
  }
  ngOnInit() {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      this.form.patchValue({ email: savedEmail });
      this.rememberMe = true;
    }
  }

  initializeForm(mode: 'login' | 'register') {
    if (mode === 'login') {
      this.form = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    } else {
      this.form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  }

  setMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.initializeForm(mode);
  }

  onSubmit(): void {
    console.log('Form Status:', this.form.status);
    console.log('Form Values:', this.form.value);

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
  
  loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe(() => {
      this.router.navigate(['/home-page']);
    });
  }

  resetPassword(): void {
    const email = this.form.get('email')?.value;
    if (email) {
      this.authService.resetPassword(email).subscribe(() => {
        this.resetMessage = 'A password reset email has been sent. Please check your inbox.';
      });
    }
  }
  
  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
  }

  // Add getters for form controls for easy access in template
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get username() {
    return this.form.get('username');
  }
}
