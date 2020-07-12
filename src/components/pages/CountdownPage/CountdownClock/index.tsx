import React, { useState, useEffect } from 'react';
import SEO from 'src/components/seo';
import Digit from './Digit';
import Separator from './Separator';
import style from './style.module.scss';

const getTimeDifference = (target: Date) => target.getTime() - Date.now();

const getDigits = (diff: number) => {
  const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const second = Math.floor((diff % (1000 * 60)) / 1000);
  return [
    Math.floor(hour / 10),
    hour % 10,
    Math.floor(minute / 10),
    minute % 10,
    Math.floor(second / 10),
    second % 10,
  ];
};

interface Props {
  target: Date;
  onFinish?: () => void;
}

const CountdownClock: React.FC<Props> = ({ target, onFinish }) => {
  const [last, setLast] = useState<number[]>([]);
  const [time, setTime] = useState<number[]>(() => getDigits(getTimeDifference(target)));

  useEffect(() => {
    let called = false;
    const id = window.setInterval(() => {
      setTime((time) => {
        setLast(time);
        const diff = getTimeDifference(target);
        if (diff <= 0 && onFinish && !called) {
          called = true;
          window.clearInterval(id);
          onFinish();
        }
        return getDigits(diff);
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [target]);

  return (
    <div className={style.clock}>
      <SEO title={`${time[0]}${time[1]}:${time[2]}${time[3]}:${time[4]}${time[5]}`} />
      <Digit value={time[0]} from={last[0]} />
      <Digit value={time[1]} from={last[1]} />
      <Separator />
      <Digit value={time[2]} from={last[2]} />
      <Digit value={time[3]} from={last[3]} />
      <Separator />
      <Digit value={time[4]} from={last[4]} />
      <Digit value={time[5]} from={last[5]} />
    </div>
  );
};

export default CountdownClock;
