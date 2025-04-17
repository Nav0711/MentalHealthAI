
 
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDE9arCNqeiI4mgAoT0WdtGETFoWy_h_UY",
    authDomain: "neurolink-7c2cc.firebaseapp.com",
    projectId: "neurolink-7c2cc",
    storageBucket: "neurolink-7c2cc.firebasestorage.app",
    messagingSenderId: "806953151681",
    appId: "1:806953151681:web:ee7e68f2f13ac507a73840"
  };

  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en'
  const provider = new GoogleAuthProvider();
