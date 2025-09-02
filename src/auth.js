import { collection} from "firebase/firestore";
import {auth, db} from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

const currentpage = window.location.pathname;
console.log("current page is", currentpage);

//redirect based on Authentiction and codename availability
onAuthStateChanged(auth, async(user)=>{
  if(!user){
    // If not logged in and not on login page, redirect to index.html
    if(!currentpage.includes("index.html")){
      window.location.href = "index.html";
    }
    return;
  }
  //User is logged in-check if codename exist
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists() && docSnap.data().codename !== undefined){
    if(!currentpage.includes("chat.html")){
      window.location.href = "chat.html";
    }
  } else{
    if(!currentpage.includes("codename.html")){
      window.location.href = codename.html;
    }
  }
});

document.addEventListener("DOMContentLoaded", ()=>{
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const loginBtn = document.querySelector("#login-btn");
  const signupBtn = document.querySelector("#signup-btn");


  
 // Handle login button click
  if(loginBtn){
    loginBtn.addEventListener("click", async (e)=>{
      e.preventDefault();
      console.log("login button clicked");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const userSnap = await getDoc(doc(db, "users", userCredentials.user.uid));

        alert("Login successful! Directing to chat")
        window.location.href = "chat.html";
        
    } catch(error){
      //Handle auth errors
      if (error.code === "auth/user-not-found") {
        alert(" No account found with this email. please sign up");
      } else if (error.code === "user/wrong password"){
        alert("Incoreect password. try again.");
      }else{
        alert("Login failed: " + error.message);
      }
    
    }
  
  });

  }



// Handle signup button click
  if(signupBtn){
    signupBtn.addEventListener("click", async(e)=>{
      e.preventDefault();
      console.log("signup buttn clicked");
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredentials.user.uid);

        await setDoc(doc(db, "users", userCredentials.user.uid), {
            email: email,
            
            createdAt: new Date()
        });
        alert("Signup successful!");
        window.location.href = "codename.html";
        console.log("Redirecting to codename.html");
      } catch(error) {
        //Handle duplicate email error
        if(error.code === "auth/email-already-in-use"){
          alert("Email already in use. try logging in instead.");
        } else{
          console.error(error);
          alert("signup failed: " + error.message);
        }
      }

    });
  }
});
