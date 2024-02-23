import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyDDdrS-5r5Y92euHTnaDL66rGkGdmrGEkQ',
  authDomain: 'flowboard-73c27.firebaseapp.com',
  projectId: 'flowboard-73c27',
  storageBucket: 'flowboard-73c27.appspot.com',
  messagingSenderId: '488183416011',
  appId: '1:488183416011:web:f7a8005a64b6831f71874e',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9098');
  connectFirestoreEmulator(db, 'localhost', 8082);
  connectFunctionsEmulator(fbFunctions, 'localhost', 5002);
}
