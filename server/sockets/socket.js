const { io } = require("../server");
const { Users } = require("../../server/class/users.js");
const { createMesagges } = require("../../server/util/utilities.js");

const users = new Users();

io.on("connection", (client) => {
  client.on("insidetheroom", (data, callback) => {
    if (!data.name || !data.hall) {
      return callback({
        error: true,
        message: "name is required",
      });
    }

    client.join(data.hall);
    users.addPerson(client.id, data.name, data.hall);

    client.broadcast.to(data.hall).emit("PersonList", users.getPersonByroom(data.hall));

    callback(users.getPersonByroom(data.hall));
  });

  client.on("sendMessage", (data) => {
    let person = users.getPerson(client.id);

    let message = createMesagges(data.name, data.message);
    client.broadcast.to(person.hall).emit("createdmessage", message);
  });

  client.on("disconnect", () => {
    let userDelete = users.deletePerson(client.id);
    client.broadcast.to(userDelete.hall).emit(
      "createMesagge",
      createMesagges(
        "administrador",
        `${userDelete.name}: 
    left the chat`
      )
    );
    client.broadcast.to(userDelete.hall).emit("PersonList", users.getPersonByroom(userDelete.hall));
  });

  client.on("privateMessage", (data) => {
    let person = users.getPerson(client.id);
    client.broadcast
      .to(data.to)
      .emit("privateMessage", createMesagges(person.name, data.message));
  });
});
