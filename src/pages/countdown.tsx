import React from 'react';
import { withPrefix } from 'gatsby';
import CountdownPage from 'src/components/pages/CountdownPage';
import Redirect from 'src/utils/Redirect';
import { Router } from '@reach/router';

const CountdownRoutePage: React.FC = () => {
  return (
    <Router basepath={withPrefix('/')}>
      <Redirect to="/" default />
      <CountdownPage path="/countdown/:id" />
    </Router>
  );
};

export default CountdownRoutePage;
