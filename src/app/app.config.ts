import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-8ecea',
        appId: '1:1098550376514:web:6c4c3e0c0af67e315715db',
        storageBucket: 'simple-crm-8ecea.appspot.com',
        apiKey: 'AIzaSyCnHOTH_Yh-pMvmsau23bcIlrrdTEbP5h4',
        authDomain: 'simple-crm-8ecea.firebaseapp.com',
        messagingSenderId: '1098550376514',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
