import { useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PeopleList from "./components/PeopleList";

const App = () => {
  const [people, setPeople] = useState([
    { id: 1, name: "Jane Doe", phone: "040-123456" },
    { id: 2, name: "John Smith", phone: "040-987654" },
    { id: 3, name: "Alice Johnson", phone: "040-555555" },
    { id: 4, name: "Bob Brown", phone: "040-111111" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (people.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      id: Date.now(),
      name: newName,
      phone: newPhone,
    };

    setPeople(people.concat(personObject));
    setNewName("");
    setNewPhone("");
  };

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  // console.log("People:", people);
  // console.log("New Name:", newName);
  // console.log("New Phone:", newPhone);
  // console.log("Filtered People:", filteredPeople);
  // console.log("Filter:", filter);

  return (
    <>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        onNameChange={(e) => setNewName(e.target.value)}
        onPhoneChange={(e) => setNewPhone(e.target.value)}
        onSubmit={handleAddPerson}
      />
      <h2>Numbers:</h2>
      <PeopleList people={filteredPeople} filter={filter} />
    </>
  );
};

export default App;
