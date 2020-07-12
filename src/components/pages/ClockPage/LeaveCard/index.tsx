import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import style from './style.module.scss';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const LeaveCard: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Card className={style.card}>
      <CardContent>
        <h3>Period</h3>
        <div className={style.hrs}>
          <TextField
            label="hours"
            onChange={onChange}
            value={value}
            variant="filled"
            className={style.input}
          />
          <span className={style.text}>per day</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveCard;
