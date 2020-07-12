import React, { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import { useMatch } from '@reach/router';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DarkIcon from '@material-ui/icons/Brightness2';
import LightIcon from '@material-ui/icons/Brightness7';
import ExtensionIcon from '@material-ui/icons/Extension';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { ThemeContext } from 'src/providers/theme';
import logoSVG from 'src/images/logo.svg';
import style from './style.module.scss';

interface Props {
  siteTitle?: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    colorPrimary: {
      color: '#fff',
    },
    link: {
      color: theme.palette.info[theme.palette.type],
      '&:hover': {
        color: theme.palette.info[theme.palette.type],
      },
    },
    header: {
      background: theme.palette.primary[theme.palette.type],
    },
  }),
);

const Header: React.FC<Props> = ({ siteTitle = '' }) => {
  const classes = useStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const allowPopup = window.localStorage.getItem('allow-popup');
    if (!allowPopup) {
      const width = 200;
      const height = 100;
      const left = (screen.availWidth - width) / 2;
      const top = (screen.availHeight - height) / 2;
      window.open(
        '/popup',
        '_blank',
        `titlebar=no,status=no,menubar=no,left=${left},top=${top},height=${height},width=${width}`,
      );
    }
  }, []);

  return (
    <header className={`${classes.header} ${style.header}`}>
      <div className={style.container}>
        <h1>
          <Link to="/" className={`${classes.link} ${style.link}`}>
            <img className={style.logo} src={logoSVG} alt="Time to leave logo" />
            {siteTitle}
          </Link>
        </h1>
        {useMatch('/set-arrive') || useMatch('/set-leave') ? (
          <IconButton
            color="primary"
            className={classes.colorPrimary}
            aria-label="extension"
            disabled
          >
            <ExtensionIcon />
          </IconButton>
        ) : null}
        <Tooltip title="Toggle light/dark theme" placement="bottom">
          <IconButton
            color="primary"
            className={classes.colorPrimary}
            aria-label={theme}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
