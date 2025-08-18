const CountryList = ({ countries, onSelect }) => {
  console.log("CountryList:", countries);
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          <a href="#" onClick={() => onSelect(country)}>
            {country.name.common}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
