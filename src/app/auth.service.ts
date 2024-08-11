import { Injectable, inject } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail, updateProfile, User } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private loggedIn = false;
  private uid: string | null = null;  // Variable to store the UID

  constructor(private router: Router) {
    this.firebaseAuth.onAuthStateChanged(user => {
      this.loggedIn = !!user;
      this.uid = user ? user.uid : null;  // Keep track of UID
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        updateProfile(response.user, { displayName: username });
        this.uid = response.user.uid;  // Store the UID
        return this.sendVerificationEmail(response.user);
      });
    return from(promise);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        this.loggedIn = true;
        this.uid = response.user.uid;  // Store the UID
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
      .then(response => {
        this.loggedIn = true;
        this.uid = response.user.uid;  
        localStorage.setItem('uid', this.uid)
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

  getUID(): string | null {
    return this.uid;
  }

  logout(): void {
    this.firebaseAuth.signOut().then(() => {
      this.loggedIn = false;
      this.uid = null;  // Clear the UID
      this.router.navigate(['/register']);
    });
  }
}
