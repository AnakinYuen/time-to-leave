import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useMatch } from '@reach/router';
import EditPage from 'src/components/pages/EditPage';
import ClockPage from 'src/components/pages/ClockPage';
import { decodeToken, Payload } from 'src/api';

interface Match {
  [param: string]: string;
  uri: string;
  path: string;
}

interface Params extends Match {
  id: string;
}

const EditClockPage: React.FC = () => {
  const match = useMatch('/edit/:id') as Params;
  const { id } = match || {};
  const [payload, setPayload] = useState<Payload | null>(null);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      navigate(`/login/${id}`);
      return;
    }
    setPayload(decodeToken(token));
  }, []);
  if (payload) {
    return <ClockPage {...payload} edit />;
  }
  return <EditPage />;
};

export default EditClockPage;
