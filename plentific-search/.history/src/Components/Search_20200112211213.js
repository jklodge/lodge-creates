import React, { useState } from "react";

const Search = props => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {};

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    console.log(searchValue);
    const postcode = searchValue.replace(/\s/g, "");
    const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i;
    const postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i;
    const validatedPostcode = regex.test(postcode);
    if (validatedPostcode) {
      const shortenedPostcode = postcode.replace(postcodeRegEx, "$1");
      props.search(shortenedPostcode);
      return shortenedPostcode;
    }
    // resetInputField();
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={e => {
          // props.search(e.target.value);
          setSearchValue(e.target.value);
        }}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value={"SEARCH"} />
    </form>
  );
};

export default Search;
