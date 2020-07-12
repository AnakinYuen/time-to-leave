import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { get } from 'src/api';
import SEO from 'src/components/seo';
import Loading from 'src/components/Loading';
import CountdownClock from './CountdownClock';
import style from './style.module.scss';

interface Props {
  path: string;
  id?: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      opacity: '0.5',
      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      '&, &:hover': {
        background: theme.palette.primary.main,
        color: theme.palette.info.main,
      },
      '&:hover': {
        opacity: '1',
      },
    },
  }),
);

const popup = () => {
  const endingWindow = window.open(
    '/end',
    '_blank',
    `titlebar=no,status=no,menubar=no,left=0,top=0,height=${screen.availHeight},width=${screen.availWidth}`,
  );
  navigate(
    !endingWindow || endingWindow.closed || typeof endingWindow.closed == 'undefined'
      ? '/end'
      : '/',
  );
};

const CountdownPage: React.FC<Props> = ({ id }) => {
  const classes = useStyles();
  const [target, setTarget] = useState<Date | null>(null);

  const onEdit = () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    (async () => {
      let expireAt: string;
      try {
        if (!id) {
          navigate('/');
          return;
        }
        expireAt = await get(id);
        setTarget(new Date(expireAt));
      } catch (err) {
        navigate('/404');
      }
    })();
  }, []);

  return (
    <div className={style.main}>
      <SEO title="Countdown" />
      {target ? (
        <>
          <CountdownClock target={target} onFinish={popup} />
          <div className={style.fab}>
            <Fab aria-label="edit" className={classes.root} onClick={onEdit}>
              <EditIcon />
            </Fab>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CountdownPage;
