import React from 'react';
import LoginPage from 'src/components/pages/LoginPage';
import Redirect from 'src/utils/Redirect';
import { Router } from '@reach/router';

const LoginRoutePage: React.FC = () => {
  return (
    <Router basepath="/">
      <Redirect to="/" default />
      <LoginPage path="/login/:id" />
    </Router>
  );
};

export default LoginRoutePage;
