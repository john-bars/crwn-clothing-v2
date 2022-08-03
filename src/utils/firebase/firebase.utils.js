// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import  {
  doc,
  getDoc,
  setDoc,
  getFirestore
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA08wzn1abzbUKOR_gJRkGbqiK2WT4qF8",
  authDomain: "crwnclothing-db-23a29.firebaseapp.com",
  projectId: "crwnclothing-db-23a29",
  storageBucket: "crwnclothing-db-23a29.appspot.com",
  messagingSenderId: "445167389000",
  appId: "1:445167389000:web:5b09c5d6ed3fc503820b7d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const database = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(database, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      setDoc (userDocRef, {
        displayName,
        email, 
        createdAt
      })
    } catch (error) {
      console.log ('error creating the user', error.message)
    };
  };

  return userDocRef;
}

