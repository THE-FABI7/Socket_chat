const { io } = require("../server");
const { Users } = require("../../server/class/users.js");
const { createMesagges } = require("../../server/util/utilities.js");

const users = new Users();

io.on("connection", (client) => {
  client.on("insidetheroom", (data, callback) => {
    if (!data.name) {
      return callback({
        error: true,
        message: "name is required",
      });
    }
    let persons = users.addPerson(client.id, data.name);

    client.broadcast.emit("PersonList", users.getPersons());

    callback(persons);
  });

  client.on("sendMessage", (data) => {
    let person = users.getPerson(client.id);

    let message = createMesagges(data.name, data.message);
    client.broadcast.emit("createdmessage", message);
  });

  client.on("disconnect", () => {
    let userDelete = users.deletePerson(client.id);
    client.broadcast.emit(
      "createMesagge",
      createMesagges(
        "administrador",
        `${userDelete.name}: 
    left the chat`
      )
    );
    client.broadcast.emit("PersonList", users.getPersons());
  });


  client.on("privateMessage", (data) => {
    let person = users.getPerson(client.id);
    client.broadcast.to(data.to).emit("privateMessage", createMesagges(person.name, data.message));
  });
});
