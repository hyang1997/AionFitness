import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth} from '@angular/fire/auth'
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const firebaseConfig = {
  apiKey: "AIzaSyDGsewAL6eOJiLIaRXRNaY3dAYwFxcKK1Q",
  authDomain: "aionfitness.firebaseapp.com",
  projectId: "aionfitness",
  storageBucket: "aionfitness.appspot.com",
  messagingSenderId: "10091355590",
  appId: "1:10091355590:web:a5fbb94bf9727764bde6c7"
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule), provideFirebaseApp(() => initializeApp(environment.firebaseconfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
