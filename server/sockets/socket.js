const { io } = require('../server');
const {Users} = require('../../server/class/users.js');

const users = new Users();

io.on('connection', (client) => {

     client.on('insidetheroom', (data, callback) => {    
        
        if(!data.name){
            return callback({
                error: true,
                message:'name is required'
            })
        }
        let persons = users.addPerson(client.id, data.name);
        callback(persons)
     })    

});