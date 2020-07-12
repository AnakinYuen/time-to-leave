import React from 'react';
import { navigate } from 'gatsby';
import { runOnClient } from './client';

const Redirect: React.FC<{ to: string; default?: boolean }> = ({ to }) => {
  runOnClient(() => {
    navigate(to);
  });
  return <></>;
};

export default Redirect;
