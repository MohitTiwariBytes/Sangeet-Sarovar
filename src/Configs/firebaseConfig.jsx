// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyClZgByercTJQ-ywVmX2SfyEeZG_DXgrVY",
  authDomain: "muse-dc3c5.firebaseapp.com",
  databaseURL: "https://muse-dc3c5-default-rtdb.firebaseio.com/",
  projectId: "muse-dc3c5",
  storageBucket: "muse-dc3c5.appspot.com",
  messagingSenderId: "218996834414",
  appId: "1:218996834414:web:16e333dcd7c85d831ea67f",
  measurementId: "G-NBXDGNPY8P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
