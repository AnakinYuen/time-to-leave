import React from 'react';
import { runOnClient } from 'src/utils/client';

const PopupPage: React.FC = () => {
  runOnClient(() => {
    window.localStorage.setItem('allow-popup', 'true');
    window.close();
  });
  return <div />;
};

export default PopupPage;
