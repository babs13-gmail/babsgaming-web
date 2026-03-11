// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ⚡ Configuration Firebase BabsGaming
const firebaseConfig = {
  apiKey: "AIzaSyBIk7KGPkGcRNtDBa4SL-9sc40qxSiZ7wI",
  authDomain: "babsgaming-6b90b.firebaseapp.com",
  projectId: "babsgaming-6b90b",
  storageBucket: "babsgaming-6b90b.firebasestorage.app",
  messagingSenderId: "897662732835",
  appId: "1:897662732835:web:87864da6033efff785ff96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
