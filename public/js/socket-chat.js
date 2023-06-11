var socket = io();

var params = new URLSearchParams(window.location.search);

/* Este bloque de código comprueba si el objeto URLSearchParams `params` tiene un parámetro llamado
"nombre". Si no existe, redirige al usuario a la página "index.html" y arroja un error con el
mensaje "se requiere el nombre". Es probable que esto se use para garantizar que el usuario
proporcione un parámetro de nombre en la URL antes de acceder a la página. */
if (!params.has("name") || !params.has("hall")) {
  window.location = "index.html";
  throw new Error("name or hall are required");
}

var user = {
  name: params.get("name"),
  hall: params.get("hall"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("insidetheroom", user, function (resp) {
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
/* Este código escucha el evento "createMessage" emitido por el servidor usando Socket.io. Cuando se
recibe el evento, ejecuta la función de devolución de llamada y registra el mensaje recibido del
servidor en la consola. */
socket.on("createMesagge", function (mensaje) {
  console.log("Servidor:", mensaje);
});

/* Este código escucha el evento 'PersonList' emitido por el servidor usando Socket.io. Cuando se
recibe el evento, se ejecuta la función de devolución de llamada y la lista de personas (o usuarios)
conectados al servidor se registra en la consola. */
socket.on("PersonList", function (persons) {
  console.log(persons);
});

socket.on("privateMessage", function (message) {
  console.loh("Message private:", message);
});
