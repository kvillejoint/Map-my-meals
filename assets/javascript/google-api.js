

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFDjMEyTQodkgBbVbbZ9DMfzDobs0n6lU",
    authDomain: "project-1-50c42.firebaseapp.com",
    databaseURL: "https://project-1-50c42.firebaseio.com",
    projectId: "project-1-50c42",
    storageBucket: "project-1-50c42.appspot.com",
    messagingSenderId: "276525470032"
  };
  firebase.initializeApp(config);

  //Get email and password

  var email = $("#mail").val().trim();
  var pass = $("#password").val().trim();
  var auth = firebase.auth();

  //Sign in email and password
  $("#login").on("click", function() {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  });
