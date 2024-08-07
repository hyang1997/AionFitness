import { Injectable, inject } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, updateProfile,GoogleAuthProvider,signInWithPopup, sendPasswordResetEmail, sendEmailVerification } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private loggedIn = false;

  constructor(private router: Router) {}

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => updateProfile(response.user, { displayName: username }));
    return from(promise);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {
        this.loggedIn = true;
        if (rememberMe) {
          localStorage.setItem('userEmail', email);
        } else {
          localStorage.removeItem('userEmail');
        }
        this.router.navigate(['/']);
      });
    return from(promise);
  }

  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider)
      .then(() => {
        this.loggedIn = true;
        this.router.navigate(['/']);
      });
    return from(promise);
  }

  sendVerificationEmail(user: User): Promise<void> {
    return sendEmailVerification(user);
  }

  resetPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.firebaseAuth, email);
    return from(promise);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    this.router.navigate(['/register']);
  }
}
