const CountryDetails = ({ country }) => {
  return (
    <div className="country-details flex-container">
      <img
        className="country-flag"
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width={120}
      />
      <h2 className="country-name">{country.name.common}</h2>
      <div className="country-info">
        <p>
          <span className="label">Capital:</span> {country.capital?.[0]}
        </p>
        <p>
          <span className="label">Area:</span> {country.area} km²
        </p>
      </div>
      <h3 className="languages-title">Languages:</h3>
      <ul className="languages-list">
        {country.languages &&
          Object.values(country.languages).map((lang) => (
            <li className="language-item" key={lang}>
              {lang}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CountryDetails;
