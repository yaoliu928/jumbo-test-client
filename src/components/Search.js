import React, { useState, useEffect } from 'react';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState(null);
  const { searchPage, loadMoreState, fetchSearchData } = props;

  const handleOnChange = (e) => setSearchValue(e.target.value);

  const callSearchFunction = () => (loadMoreState ? fetchSearchData(searchValue, searchPage) : fetchSearchData(searchValue, 1));

  useEffect(callSearchFunction, [searchPage, searchValue]);

  return (
    <div className="ui search popular__header--search centered">
      <div className="ui icon input fluid">
        <input className="prompt" value={searchValue} type="text" placeholder="Search" onChange={handleOnChange} />
        <i className="search icon" />
      </div>
      <div className="results" />
    </div>
  );
};

export default Search;
