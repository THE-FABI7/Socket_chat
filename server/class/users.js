// {
//     id: 'AANlsaDAS123',
//     name: 'Fabian user',
// }

class Users {
    constructor() {
      this.persons = [];
    }
  
    addPerson(id, name) {
      let person = { id, name };
      this.persons.push(person);
      return this.persons;
    }
  
    getPerson(id) {
      let person = this.persons.filter((person) => {
        return person.id === id;
      })[0];
      return person;
    }
  
    getPersons() {
      return this.persons;
    }
  
    deletePerson(id) {
      let personDelete = this.getPerson(id);
      this.persons = this.persons.filter((person) => {
        return person.id !== id;
      });
      return personDelete;
    }
  }
  
  module.exports = {
    Users,
  };
  
