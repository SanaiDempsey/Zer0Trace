import {  auth, db } from "./firebase.js";
import { doc, collection, setDoc, getDocs,serverTimestamp,query, where} from 'firebase/firestore';
import {onAuthStateChanged, updateProfile} from 'firebase/auth';

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("DOM Loaded");

    const input = document.getElementById("codename");
    const saveBtn = document.getElementById("save-codename");
    const errorDisplay = document.getElementById("codename-error");

    let currentUser = null;

    // check auth state changed
    onAuthStateChanged(auth, (user)=>{
        if(user){
            console.log("User is signed in:", user.uid);
            currentUser = user;
        } else{
            console.error("No user signed in.");
        }
    });
    saveBtn.addEventListener("click", async()=>{
        const codename = input.value.trim();

        if(!codename){
            errorDisplay.textContent = "Codename is required.";
            return;
        }

        if ( codename.length > 20) {
            errorDisplay.textContent = "Codename must be 20 charcaters or less.";
            return;
        }

        const validPattern = /^[a-zA-Z0-9_]+$/;
        if(!validPattern.test(codename)){
            errorDisplay.textContent = " Only letters, numbers, and underscores are allowed.";
            return;
        }

        if(!currentUser){
            errorDisplay.textContent = "User not signed in.";
            return;
        }
        try{
            await setDoc(doc(db, "users", currentUser.uid),{
                codename: codename,
                updatedAt: serverTimestamp(),
            });
            await updateProfile(currentUser,{displayName: codename});
            
            console.log("Codename saved!");
            console.log("Redirecting...");
            
            window.location.href = "chat.html";
        } catch(error) {
            console.error("Error saving codename:", error);
            errorDisplay.textContent = "Something went wrong. Try again.";
        }
    });
});