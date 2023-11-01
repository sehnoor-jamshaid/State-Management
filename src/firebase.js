// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBcDCmW6fgUseO4laPBAYGb-4pxmdj9PPI",
  authDomain: "state-management-2eba9.firebaseapp.com",
  projectId: "state-management-2eba9",
  storageBucket: "state-management-2eba9.appspot.com",
  messagingSenderId: "1020551731839",
  appId: "1:1020551731839:web:70aa0b7082a086af657d4a",
  measurementId: "G-788ER3XF1N"
};

const app=initializeApp(firebaseConfig)
const auth=getAuth()
const provider=new GoogleAuthProvider()
export{app,auth,provider}