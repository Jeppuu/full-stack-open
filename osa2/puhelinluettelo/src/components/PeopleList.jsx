const PeopleList = ({ people, filter }) => (
  <div className="card">
    {filter && people.length === 0 && <p>No results found for "{filter}"</p>}
    {people.map((person) => (
      <p key={person.id}>
        {person.name}: {person.phone}
      </p>
    ))}
  </div>
);

export default PeopleList;
