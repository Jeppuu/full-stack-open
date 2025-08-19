import Weather from "./Weather";

const CountryDetails = ({ country }) => {
  const lat = country.latlng[0];
  const lng = country.latlng[1];
  const capital = country.capital?.[0];
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  console.log("Lat:", lat);
  console.log("Lng:", lng);
  console.log("Capital:", capital);

  return (
    <div className="country-details flex-container">
      <img
        className="country-flag"
        src={country.flags.svg}
        alt={country.flags.alt}
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
      {lat && lng && capital && apiKey && (
        <Weather lat={lat} lon={lng} capital={capital} apiKey={apiKey} />
      )}
    </div>
  );
};

export default CountryDetails;
