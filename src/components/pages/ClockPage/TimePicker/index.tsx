import React from 'react';
import { MuiPickersUtilsProvider, TimePicker, TimePickerProps } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import style from './style.module.scss';

type Props = Omit<TimePickerProps, 'variant'>;

const StaticTimePicker: React.FC<Props> = ({ disabled, ...props }) => {
  let className = style.container;
  if (disabled) {
    className += ' ' + style.disabled;
  }

  return (
    <div className={className}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker {...props} variant="static" />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default StaticTimePicker;
