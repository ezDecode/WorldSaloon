import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (process.env.GOOGLE_CLIENT_EMAIL && privateKey) {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } else {
    // Fallback for environments where ADC is expected to work
    initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
}

export const db = getFirestore();
