
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/web-extension";
import { addDoc,collection,getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCGz9V3BcG00uvODL3Bffyhhq-49WhXBZc",
  authDomain: "netflix-clone-64ae2.firebaseapp.com",
  projectId: "netflix-clone-64ae2",
  storageBucket: "netflix-clone-64ae2.firebasestorage.app",
  messagingSenderId: "1014519596002",
  appId: "1:1014519596002:web:47477362cfff73a60dafbb"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password)=> {
    try {
      const res =  await createUserWithEmailAndPassword(auth,email,password);
      const user = res.user;
      await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider: 'local',
        email,

      });
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))

    }
} 

const login = async (email, password)=> {
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))

    }
}

const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout};