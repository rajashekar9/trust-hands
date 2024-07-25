import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDztVpoPbM3j_OKa5ElzjnxrlHesHwqzs0",
  authDomain: "trusted-hands.firebaseapp.com",
  projectId: "trusted-hands",
  storageBucket: "trusted-hands.appspot.com",
  messagingSenderId: "468077725066",
  appId: "1:468077725066:web:bbbfd74aa1aee9d378b473",
  measurementId: "G-CGGP1F54VG"
};

// Initialize Firebase
initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
