import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { login } from 'src/api';
import SEO from 'src/components/seo';
import Layout from 'src/components/Layout';
import logoSVG from 'src/images/logo.svg';
import style from './style.module.scss';

interface Props {
  path: string;
  id?: string;
}

const useStyles = makeStyles((_) =>
  createStyles({
    card: {
      padding: '1.6rem',
    },
    password: {
      marginBottom: '1rem',
    },
  }),
);

const LoginPage: React.FC<Props> = ({ id }) => {
  const classes = useStyles();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((isShow) => !isShow);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  };

  const onLogin = async () => {
    if (!id) {
      return;
    }
    setIsLoggingIn(true);
    await login(id, password);
    navigate('/edit');
  };

  return (
    <Layout className={style.main}>
      <SEO title="Login" />
      <Card variant="outlined">
        <CardContent className={`${classes.card} ${style.card}`}>
          <img className={style.logo} src={logoSVG} alt="Time to leave logo" />
          <h1 className={style.h1}>Sign in</h1>
          <h2 className={style.h2}>to continue to edit</h2>
          <FormControl variant="outlined" className={classes.password}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    disabled={isLoggingIn}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
              disabled={isLoggingIn}
            />
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            className={style.field}
            onClick={onLogin}
            disabled={isLoggingIn}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default LoginPage;
