import React, { useState, useEffect } from 'react';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';
import axios from 'axios';
import Header from '../components/Header';
import CardList from '../components/CardList';
import Button from '../components/Button';
import Loader from '../components/Loader';

const Popular = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [loadMoreState, setLoadMoreStat] = useState(false);
  const [popularPage, setPopularPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPopularData = (page) => {
    setSearchState(false);
    page === 1 ? setIsLoading(true) : setIsLoading(false);
    axios.get(`https://jumbo-server.herokuapp.com/api/popular?page=${page}`)
      .then((res) => {
        setPopularMovies([...popularMovies, res.data.data]);
        setSearchMovies([]);
        setSearchPage(1);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchData = (searchValue, page) => {
    setSearchState(true);
    page === 1 ? setIsLoading(true) : setIsLoading(false);
    axios.get(`https://jumbo-server.herokuapp.com/api/search?keyWord=${searchValue}&page=${page}`)
      .then((res) => {
        if (!searchValue) {
          setPopularPage(1);
          fetchPopularData(1);
        } else {
          if (loadMoreState) {
            setSearchMovies([...searchMovies, res.data.data]);
            setLoadMoreStat(false);
          } else {
            setSearchPage(1);
            setSearchMovies([res.data.data]);
          }
          setIsLoading(false);
          setPopularMovies([]);
        }
      })
      .catch((err) => console.log(err));
  };

  const loadMore = () => {
    if (searchState) {
      setLoadMoreStat(true);
      return setSearchPage(searchPage + 1);
    } setPopularPage(popularPage + 1);
  };

  const callFetchPopularData = () => fetchPopularData(popularPage);

  useEffect(callFetchPopularData, [popularPage]);


  return (
    <div className="popular">
      <header className="popular__header">
        <Header
          fetchSearchData={fetchSearchData}
          searchPage={searchPage}
          loadMoreState={loadMoreState}
        />
      </header>
      <div className="popular__card-list">
        {isLoading ? <div className="loader"><Loader /></div>
          : <CardList searchState={searchState} popularMovies={searchState ? searchMovies : popularMovies} />}
        <div>
          <ScrollUpButton />
        </div>
        <div className="button--more">
          <Button className="ui inverted green basic button" onClick={loadMore} value="Load More" />
        </div>
      </div>
    </div>
  );
};

export default Popular;
