function getID(id){
    return document.getElementById(id).value;
  }

  function arrayJSON(nombre, filas, columnas){
    var data = {
        nombre:control,
        filas:filas,
        columnas:columnas,
    };
    return data
  }

  function insertarCine(){
    if (document.getElementById("nombre").value == ""||document.getElementById("filas").value == ""||document.getElementById("columnas").value == "") {
        alert("Porfavor llenar todos los campos requeridos");
    } else {
        var varnombre = getID("nombre");
        var varfilas = getID("filas");
        var varcolumnas = getID("columnas");

        var arrayData = arrayJSON(varnombre, varfilas, varcolumnas);
        console.log(arrayData);
        var cine = firebase.database().ref(varnombre+"/");
        cine.set(arrayData);
        alert("Se ha guardado exitosamente");
        
        document.getElementById("nombre").value = ""
        document.getElementById("filas").value = ""
        document.getElementById("columnas").value = ""

        location.reload();
    }
  }

  function innerHTML(id,result){
    return document.getElementById(id).innerHTML+=result;
}

function table(nombre,filas,columnas){
    return '<tr>'+
       '<td>'+nombre+'</td>'+
       '<td>'+filas+'</td>'+
       '<td>'+columnas+'</td>'+
       '<td><i class="fas fa-edit" onclick="editCine('+nombre+')"></i></td>'+
       '<td><i class="fas fa-trash" onclick="remove('+nombre+')"></i></td>'+
   '</tr>';
}

function verCines(){
    var cines = firebase.database().ref("/");
    cines.on("child_added",function(data){
      var cinesValor = data.val();
      var tablaC = table(cinesValor.nombre,cinesValor.filas,cinesValor.columnas);
      innerHTML("loadCines",tablaC);
    });
}

function editCine(nombre){
    var cines = firebase.database().ref(nombre+"/");
    cines.on("value",function(snapshot){
        var cinesValor = snapshot.val();
        document.getElementById("nombre").value = cinesValor.nombre;
        document.getElementById("filas").value = cinesValor.filas;
        document.getElementById("columnas").value = cinesValor.columnas;
        
    });

  }

  function remove(nombre){
      var cine = firebase.database().ref(nombre+"/");
      cine.remove();
      location.reload();
  }