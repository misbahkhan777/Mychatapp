import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ---------------- SIGNUP ---------------- */

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date()
      });

      alert("Account Created Successfully");

      window.location.href = "login.html";

    } catch (error) {
      alert(error.message);
    }

  });
}

/* ---------------- LOGIN ---------------- */

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {

      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful");

      window.location.href = "index.html";

    } catch (error) {

      alert(error.message);

    }

  });

}
/* ---------------- HOME PAGE ---------------- */

const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

onAuthStateChanged(auth, (user) => {

    if (user) {

        if (userName) {
            userName.innerText = user.displayName || "User";
        }

        if (userEmail) {
            userEmail.innerText = user.email;
        }

    } else {

        if (window.location.pathname.includes("index.html")) {
            window.location.href = "login.html";
        }

    }

});

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        alert("Logout Successful");

        window.location.href = "login.html";

    });

}
/* ---------------- HOME USER PROFILE ---------------- */

const logoutBtn = document.getElementById("logoutBtn");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");


onAuthStateChanged(auth, async (user) => {

    if (user) {

        if(userEmail){
            userEmail.innerText = user.email;
        }

        // Get user data from Firestore
        const userDoc = await getDoc(
            doc(db, "users", user.uid)
        );

        if(userDoc.exists()){

            const data = userDoc.data();

            if(userName){
                userName.innerText = data.name;
            }

        }

    } else {

        if(
        window.location.pathname.includes("index.html")
        ){

            window.location.href = "login.html";

        }

    }

});


/* ---------------- LOGOUT ---------------- */

if(logoutBtn){

logoutBtn.addEventListener("click", async()=>{

    await signOut(auth);

    alert("Logout Successful");

    window.location.href="login.html";

});

}
/* ===========================
   CREATE POST
=========================== */

const postBtn = document.getElementById("postBtn");
const postText = document.getElementById("postText");


if(postBtn){

postBtn.addEventListener("click", async()=>{

const user = auth.currentUser;


if(!user){

alert("Please login first");
return;

}


const text = postText.value.trim();


if(!text){

alert("Write something");
return;

}


try{


await addDoc(collection(db,"posts"),{

uid:user.uid,

text:text,

email:user.email,

createdAt:new Date()

});


alert("Post Created");


postText.value="";


loadPosts();


}catch(error){

alert(error.message);

}


});


}


/* ===========================
   LOAD POSTS
=========================== */


const postsContainer = document.getElementById("postsContainer");


async function loadPosts(){


if(!postsContainer){
return;
}


postsContainer.innerHTML="";


const q = query(
collection(db,"posts"),
orderBy("createdAt","desc")
);


const querySnapshot = await getDocs(q);



querySnapshot.forEach((doc)=>{


const post = doc.data();


const div = document.createElement("div");


div.className="post-card";


div.innerHTML=`

<h4>${post.email}</h4>

<p>${post.text}</p>

`;


postsContainer.appendChild(div);



});


}



onAuthStateChanged(auth,(user)=>{


if(user){

loadPosts();

}


});