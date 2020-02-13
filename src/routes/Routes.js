import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';

const Routes = () => (
  <Fragment>
    <Route exact path="/" component={HomePage} />
    <Route path="/movies/:id" component={MoviePage} />
  </Fragment>
);


export default Routes;
