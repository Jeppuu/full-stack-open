import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PeopleList from "./components/PeopleList";
import peopleService from "./services/people";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch initial data from the server
  useEffect(() => {
    console.log("Effect");
    peopleService.getAll().then((data) => {
      setPeople(data);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (people.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace old number with a new one?`
        )
      ) {
        const person = people.find((p) => p.name === newName);
        updatePhone(person, newPhone);
      }
      return;
    }

    const personObject = {
      name: newName,
      phone: newPhone,
    };

    peopleService.addPerson(personObject).then((returnedPerson) => {
      console.log("Added:", returnedPerson);
      setPeople(people.concat(returnedPerson));
      setNewName("");
      setNewPhone("");
    });
  };

  const handleDeletePerson = (person) => {
    console.log("Deleting:", person);
    if (!window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      return;
    }
    peopleService.deletePerson(person.id).then(() => {
      setPeople(people.filter((p) => p.id !== person.id));
    });
  };

  const updatePhone = (person, newPhone) => {
    peopleService.updatePhone(person, newPhone).then((updatedPerson) => {
      setPeople(people.map((p) => (p.id === person.id ? updatedPerson : p)));
    });
  };

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

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
      <PeopleList
        people={filteredPeople}
        filter={filter}
        onDelete={handleDeletePerson}
      />
    </>
  );
};

export default App;
