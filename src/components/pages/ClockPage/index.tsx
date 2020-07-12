import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { register, update } from 'src/api';
import { Mode } from 'src/types';
import SEO from 'src/components/seo';
import Layout from 'src/components/Layout';
import TimePicker from './TimePicker';
import LeaveCard from './LeaveCard';
import style from './style.module.scss';

const useStyles = makeStyles((theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    error: {
      color: theme.palette.error.light,
    },
  }),
);

interface CreateProps {
  mode: Mode;
}

interface EditProps {
  id: string;
  period: number;
  expireAt: number;
  edit: true;
}

type Props = CreateProps & Partial<EditProps>;

const oneHourInMillisecond = 3600000;

const ClockPage: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(() => {
    if (props.expireAt) {
      const expireAt = new Date(props.expireAt);
      if (props.mode === 'arrive' && typeof props.period === 'number') {
        return new Date(expireAt.getTime() - oneHourInMillisecond * props.period);
      }
      return expireAt;
    }
    return new Date();
  });
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hours, setHours] = useState(props.edit ? `${props.period}` : '9');

  const onHoursChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value === hours) {
      return;
    }
    if (event.target.value === '') {
      setHours('');
      return;
    }
    const num = Number(event.target.value);
    if (isNaN(num)) {
      return;
    }
    setHours(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((isShow) => !isShow);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value);
    setInvalidPassword(event.target.value.length < 8);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  };

  const onChangeSelectedDate = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const onSet = async () => {
    if (!props.edit && password.length < 8) {
      setInvalidPassword(true);
      return;
    }
    setIsRegistering(true);

    let date = selectedDate;
    let period = 0;
    if (props.mode === 'arrive') {
      period = Number(hours);
      date = new Date(date.getTime() + oneHourInMillisecond * period);
    }

    let id: string;
    if (props.id) {
      id = (await update(date.toISOString(), period)).id;
    } else {
      id = (await register(date.toISOString(), password, props.mode, period)).id;
    }
    navigate(`/countdown/${id}`);
  };

  return (
    <Layout className={style.main}>
      <SEO title={props.edit ? 'Edit' : 'Create'} />
      <div className={style.group}>
        <TimePicker value={selectedDate} onChange={onChangeSelectedDate} disabled={isRegistering} />
        {props.mode === 'arrive' ? (
          <div className={style.card}>
            <LeaveCard value={hours} onChange={onHoursChange} />
          </div>
        ) : null}
      </div>
      {props.edit ? null : (
        <FormControl className={`${classes.margin} ${style.field}`} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            error={invalidPassword}
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
                  disabled={isRegistering}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
            disabled={isRegistering}
          />
          {invalidPassword ? (
            <p className={classes.error}>password length must be greater than 8</p>
          ) : null}
        </FormControl>
      )}
      <Button
        variant="contained"
        color="secondary"
        className={style.field}
        onClick={onSet}
        disabled={isRegistering || invalidPassword}
      >
        SET
      </Button>
    </Layout>
  );
};

export default ClockPage;
