import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCZOBgR-ntPxo7LXd-48YyGYDCDPLos6ao",
  authDomain: "ifreview-b7f28.firebaseapp.com",
  projectId: "ifreview-b7f28",
  storageBucket: "ifreview-b7f28.firebasestorage.app",
  messagingSenderId: "95895006080",
  appId: "1:95895006080:web:85da14598d70d57e48ef65"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);