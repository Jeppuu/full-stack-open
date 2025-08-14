import { useState } from "react";

import "./App.css";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (people.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      id: people.length + 1,
      name: newName,
    };
    setPeople(people.concat(personObject));
    setNewName("");
  };

  console.log("People:", people);
  console.log("New Name:", newName);

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
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers:</h2>
      {people.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </>
  );
};

export default App;
