import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const api_key = import.meta.env.VITE_FB_API_KEY

const firebaseConfig = {
    apiKey: api_key,
    authDomain: "anime-db-b12df.firebaseapp.com",
    projectId: "anime-db-b12df",
    storageBucket: "anime-db-b12df.appspot.com",
    messagingSenderId: "810543621098",
    appId: "1:810543621098:web:1a25e41c6e49a4e39ac893"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db 