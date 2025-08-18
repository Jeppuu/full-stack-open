const SearchInput = ({ value, onChange }) => (
  <div className="search-input-container">
    <input
      type="text"
      className="search-input"
      value={value}
      onChange={onChange}
      placeholder="Search for a country"
      autoFocus
    />
  </div>
);

export default SearchInput;
