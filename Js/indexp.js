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

function updateTextInput(val) {
    document.getElementById('vp').value=val+"%"; 
  }

  function updateTextInput2(val) {
    document.getElementById('vd').value=val+"m"; 
  }

  function getID(id){
    return document.getElementById(id).value;
  }

  function arrayJSON(nombre, filas, columnas){
    var data = {
        nombre:nombre,
        filas:filas,
        columnas:columnas,
    };
    return data
  }

  function innerHTML(id,result){
    return document.getElementById(id).innerHTML+=result;
  }

  function select(nombre){
    return '<option value="'+nombre+'">'+nombre+'</option>'
  }

  function verCines(){
    var cines = firebase.database().ref("Cine/");
    cines.on("child_added",function(data){
      var cinesValor = data.val();
      var tablaC = select(cinesValor.nombre);
      innerHTML("cines",tablaC);
    });
  }

  function verValores(nombre){
    var cines = firebase.database().ref("Cine/'"+nombre+"'/");
    cines.on("value",function(snapshot){
      var cinesValor = snapshot.val();
      console.log(JSON.stringify(cinesValor));
      document.getElementById('filas').value=cinesValor.filas; 
      document.getElementById('columnas').value=cinesValor.columnas; 
      var capacidad = cinesValor.filas*cinesValor.columnas;
      document.getElementById('capacidad').value=capacidad; 
    });
  }