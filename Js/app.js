

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyAA8U_00pwHAun-ZZl-D1S8PmO1Y1bbJZw",
    authDomain: "space-planner-438cc.firebaseapp.com",
    databaseURL: "https://space-planner-438cc.firebaseio.com",
    projectId: "space-planner-438cc",
    storageBucket: "space-planner-438cc.appspot.com",
    messagingSenderId: "956751240382",
    appId: "1:956751240382:web:a2dd0db833ff96c40012ef",
    measurementId: "G-PRHWGHREYZ",
    clientId: "956751240382 - oagm27emft4f64mcanhaht4t86ge1uk4.apps.googleusercontent.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig); 

var database = firebase.database();
var auth = firebase.auth();


//click
document.getElementById('googleBtm').addEventListener('click', LoginGoogle);



// Connect application with firebase
const form = document.forms['loginForm'];
//firebase.auth().onAuthStateChanged(handleAuthState);
form.addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const email = form['inputEmail'].value;
    const password = form['inputPassword'].value;
   const isLoginOrSignup = form['isLoginOrSignup'].value;

    if (isLoginOrSignup === 'isLogin') {
        return loginUser(email, password);
    }


    return createUser(email, password);
});

function signoutUser() {
    firebase.auth().signOut();
}

function createUser(email, password) {
    console.log('Creando el usuario con email ' + email);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
           
            alert("Correo registrado");
            user


        })
        .catch(function (error) {
            console.error(error)
            alert(error);
                
        });
}

function loginUser(email, password) {
    console.log('Loging user ' + email);

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
            console.log('Credenciales correctas, ¡bienvenido!');
            
        })
        .catch(function (error) {
            console.log(error);
        });
}


/*

// Register a new user
firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function (err) {
        // Handle errors
    });

// Sign in existing user
firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function (err) {
        // Handle errors
    });

// Sign out user
firebase.auth().signOut()
    .catch(function (err) {
        // Handle errors
    });

*/





function LoginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().languageCode = 'pt';

    //alert("");

    //console.log("token" + provider);
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        console.log("token" + token);
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        console.log("token" + email);
    });


    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}