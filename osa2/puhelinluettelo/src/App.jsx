import { useState } from "react";

import "./App.css";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (people.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      id: people.length + 1,
      name: newName,
      phone: newPhone,
    };
    setPeople(people.concat(personObject));
    setNewName("");
    setNewPhone("");
  };

  console.log("People:", people);
  console.log("New Name:", newName);
  console.log("New Phone:", newPhone);

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleAddPerson}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Add a new name"
        />
        <input
          type="text"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Add a new phone number"
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers:</h2>
      {people.map((person) => (
        <p key={person.name}>
          {person.name}: {person.phone}
        </p>
      ))}
    </>
  );
};

export default App;
