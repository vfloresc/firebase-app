import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCooXN9uQ0OoGtIpVQIxSdwAcBLmhikQM0",
  authDomain: "species-app-a654c.firebaseapp.com",
  projectId: "species-app-a654c",
  storageBucket: "species-app-a654c.firebasestorage.app",
  messagingSenderId: "833874592167",
  appId: "1:833874592167:web:8e41f81ebc9df47b4cf682",
  databaseURL:"https://species-app-a654c-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
export const storage = getStorage(app);