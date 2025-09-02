//import firebase config
import{db, auth} from "./firebase.js";
// import firestore functions
import{
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    getDoc,
    deleteDoc
   
    
} from "firebase/firestore";
//import auth functions
import { onAuthStateChanged, signOut } from "firebase/auth";
//User Setup
let codename = "Anonymous";//Incase user has no codename saved

//Check if user is logged in and retrieve codename
onAuthStateChanged(auth, async(user)=>{
    if(user){
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const userData = docSnap.data();
            codename = userData.codename || "Anonymous";
            localStorage.setItem("codename", codename);
        }
    }
});


document.addEventListener("DOMContentLoaded", () =>{
const messageInput = document.querySelector("#message-input");
const sendBtn = document.querySelector("#send-btn")
const messagesForm = document.querySelector("#messagesForm");
const chatDisplayArea = document.querySelector("#chatDisplayArea");
const logoutBtn = document.getElementById("logoutBtn")

//Logout Logic
if(logoutBtn){
    logoutBtn.addEventListener("click", async()=>{
       try{
        await signOut(auth);
        alert("You have been logged out.");
        window.location.href = "index.html";
       }catch(error){
        console.error("Logout error:", error);
        alert("Error logging you out. Try again.");
       }
    })
}

//Message sending Logic
sendBtn.addEventListener("click", async function() {
     event.preventDefault();
    if (messageInput.value.trim() !== "") {
        const sender = auth.currentUser?.displayName || "Anonymous";
        const expiresAt = Date.now() + 5 * 60 * 1000;
        
        try{
        await addDoc(collection(db, "messages"),{
        text:messageInput.value,
        sender: sender,
        timestamp:serverTimestamp(),
        expiresAt: expiresAt
    });
    
     messageInput.value ="";
    } catch(error){
        console.error("Failed to send message", error);
    }
    console.log("Message sent!");
    }
});

//Real-Time Messaging Display
const q = query(collection(db, "messages"), orderBy("timestamp"));
onSnapshot(q, (snapshot)=>{
    chatDisplayArea.innerHTML = "";
    snapshot.forEach(async(docSnapshot)=>{
        //clear display before new snapshot
        const data = docSnapshot.data();
         //check if message expired
        if(Date.now()> data.expiresAt){
            try{
                await deleteDoc(docSnapshot.ref);
            } catch(error){
                console.error("Failed to delete expired message:", error);
            }
            return;
         }else{
            // set timeout to delete message if not expired
            const timeuntilExpire = data.expiresAt-Date.now();

            setTimeout(async()=>{
                try{
                    await deleteDoc(docSnapshot.ref);
                    console.log("Messages auto-deleted:", docSnapshot.id);
                }catch(error){
                    console.error("Failed to auto-delete:", error);
                }
            }, timeuntilExpire);
         }

        // create wrapper for each message block
         const messageWrapper = document.createElement("div");
        messageWrapper.classList.add("message-wrapper");
       
        //Get sender info and current user
        const sender = data.sender || "unknown";
        const currentUser = localStorage.getItem("codename");
        
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(sender === currentUser ? "right" : "left");

        //Sender Bubble
        const senderElement = document.createElement("div");
        senderElement.classList.add("sender");
        senderElement.textContent = sender;

       //Message Bubble
        const textElement = document.createElement("div");
        textElement.classList.add("text");
        textElement.textContent = data.text;

        //Timestamp Display
        const timestamp = data.timestamp?.toDate?.();
        const timeElement = document.createElement("div");
        timeElement.classList.add("timestamp");
        if(timestamp instanceof Date && !isNaN(timestamp)){
            timeElement.textContent = timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }else
        {
            timeElement.textContent = "";
        }
        
        messageElement.appendChild(senderElement);
        messageElement.appendChild(textElement);
        messageElement.appendChild(timeElement);

        messageWrapper.appendChild(messageElement);
        chatDisplayArea.appendChild(messageWrapper);

    })
})
});