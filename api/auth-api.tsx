import firebase from '../config/firebase'
import 'firebase/firestore'
import { AuthDetails } from "../types";

const db = firebase.firestore();

export const logoutUser = () => {
    firebase.auth().signOut();
};

export const signUpUser = async ({ name, email, password }: AuthDetails) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      firebase.auth().currentUser?.updateProfile({
        displayName: name
      });
      db.collection("users").add({
        name: name,
        email: email,
      })
  
      return {};
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return {
            error: "E-mail already in use."
          };
        case "auth/invalid-email":
          return {
            error: "Invalid e-mail address format."
          };
        case "auth/weak-password":
          return {
            error: "Password is too weak."
          };
        case "auth/too-many-requests":
          return {
            error: "Too many request. Try again in a minute."
          };
        default:
          return {
            error: "Check your internet connection."
          };
      }
    }
};

export const loginUser = async ({ email, password }: AuthDetails) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return {};``
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          return {
            error: "Invalid email address format."
          };
        case "auth/user-not-found":
        case "auth/wrong-password":
          return {
            error: "Invalid email address or password."
          };
        case "auth/too-many-requests":
          return {
            error: "Too many request. Try again in a minute."
          };
        default:
          return {
            error: "Check your internet connection."
          };
      }
    }
};