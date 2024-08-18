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
  private uid: string | null = null;

  constructor(private router: Router) {
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
        this.uid = user.uid;
        localStorage.setItem('uid', this.uid);  // Persist UID
      } else {
        this.loggedIn = false;
        this.uid = null;
        localStorage.removeItem('uid');
      }
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        updateProfile(response.user, { displayName: username });
        this.uid = response.user.uid;
        localStorage.setItem('uid', this.uid);  // Persist UID
        return this.sendVerificationEmail(response.user);
      });
    return from(promise);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        this.loggedIn = true;
        this.uid = response.user.uid;
        localStorage.setItem('uid', this.uid);  // Persist UID
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
        localStorage.setItem('uid', this.uid);  // Persist UID
        this.router.navigate(['/']);
      });
    return from(promise);
  }

  getUID(): string | null {
    return this.uid || localStorage.getItem('uid');
  }

  logout(): void {
    this.firebaseAuth.signOut().then(() => {
      this.loggedIn = false;
      this.uid = null;
      localStorage.removeItem('uid');
      this.router.navigate(['/register']);
    });
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
}
