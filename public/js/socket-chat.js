var socket = io();

var params = new URLSearchParams(window.location.search);

/* Este bloque de código comprueba si el objeto URLSearchParams `params` tiene un parámetro llamado
"nombre". Si no existe, redirige al usuario a la página "index.html" y arroja un error con el
mensaje "se requiere el nombre". Es probable que esto se use para garantizar que el usuario
proporcione un parámetro de nombre en la URL antes de acceder a la página. */
if (!params.has("name")) {
  window.location = "index.html";
  throw new Error("name is required");
}

var user = {
  name: params.get("name"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("insidetheroom", user, function (resp){
       console.log("users connected:", resp);
  });
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
socket.emit(
  "enviarMensaje",
  {
    user: "Fernando",
    message: "Hola Mundo",
  },
  function (resp) {
    console.log("respuesta server: ", resp);
  }
);

// Escuchar información
socket.on("createMesagge", function (mensaje) {
  console.log("Servidor:", mensaje);
});


socket.on('PersonList',function(persons){
        console.log(persons)
});
