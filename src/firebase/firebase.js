// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//     apiKey: "AIzaSyBI76EDZUQ1B_xRIJf8-JvnBuutg-K90zU",
//     authDomain: "vr-clinician-dashboard.firebaseapp.com",
//     projectId: "vr-clinician-dashboard",
//     storageBucket: "vr-clinician-dashboard.appspot.com",
//     messagingSenderId: "597510245123",
//     appId: "1:597510245123:web:a439f7b512efe5dd91b736"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"
// import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBI76EDZUQ1B_xRIJf8-JvnBuutg-K90zU",
    authDomain: "vr-clinician-dashboard.firebaseapp.com",
    projectId: "vr-clinician-dashboard",
    storageBucket: "vr-clinician-dashboard.appspot.com",
    messagingSenderId: "597510245123",
    appId: "1:597510245123:web:a439f7b512efe5dd91b736"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app);
const storage = getStorage(app);

export { app, auth, db, storage}
// export { app, auth, db}

