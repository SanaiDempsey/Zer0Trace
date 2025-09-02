
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';

 import{getFirestore} from 'firebase/firestore';

  const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
  };


console.log("Firebase API Key:", import.meta.env.VITE_API_KEY);

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);

 export{auth, db};


setPersistence(auth, browserLocalPersistence).catch((e) => {
  console.warn("Auth persistence unavailable; using in-memory.", e);
});


export const whenAuthed = new Promise((resolve) => {
  const unsub = onAuthStateChanged(auth, (user) => {
    unsub();
    resolve(user || null);
  });
});

export const onAuthChanged = (cb) => onAuthStateChanged(auth, cb);


export async function signInAnon() {
  try {
    const cred = await signInAnonymously(auth);
    console.log("Anon UID:", cred.user.uid);
    return cred.user;
  } catch (e) {
    console.error("Anon sign-in error:", e);
    throw e;
  }
}



