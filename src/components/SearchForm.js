import React from "react";
import PropTypes from "prop-types";
import { getByLabelText } from "@testing-library/react";

const SearchForm = ({ searchText, setSearchText, onSubmit }) => {
  const handleInputChange = (event) => setSearchText(event.target.value);

  return (
    <div className="search-form">
      <getByLabelText htmlFor="city">UK City: </getByLabelText>
      <input
        type="text"
        name="city"
        id="city"
        onChange={handleInputChange}
        value={searchText}
      />
      <button type="submit" onClick={onSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
};
