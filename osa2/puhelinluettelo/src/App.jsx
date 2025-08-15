import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PeopleList from "./components/PeopleList";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("Effect");
    axios.get("http://localhost:3001/people").then((response) => {
      console.log("Promise fulfilled");
      setPeople(response.data);
    });
  }, []);

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
