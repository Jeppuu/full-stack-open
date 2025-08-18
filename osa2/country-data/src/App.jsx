import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import SearchInput from "./components/SearchInput";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setCountries([]);
      setSelectedCountry(null);
      setError(null);
      return;
    }
    setLoading(true);
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        const filtered = res.data.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        );
        setCountries(filtered);
        setSelectedCountry(filtered.length === 1 ? filtered[0] : null);
        setError(null);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch country data");
        setCountries([]);
        setSelectedCountry(null);
        setLoading(false);
      });
  }, [query]);

  return (
    <>
      <h1>Country Search</h1>
      <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <>
          {countries.length > 10 && (
            <p>Too many matches, please refine your search.</p>
          )}
          {countries.length > 1 && countries.length <= 10 && (
            <CountryList countries={countries} onSelect={setSelectedCountry} />
          )}
          {selectedCountry && <CountryDetails country={selectedCountry} />}
        </>
      )}
    </>
  );
}

export default App;
