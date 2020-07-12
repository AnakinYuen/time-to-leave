import React, { useState, useEffect } from 'react';
import style from './style.module.scss';

const digitSegments = [
  [0, 1, 2, 3, 4, 5],
  [1, 2],
  [0, 1, 6, 4, 3],
  [0, 1, 6, 2, 3],
  [5, 6, 1, 2],
  [0, 5, 6, 2, 3],
  [0, 5, 4, 3, 2, 6],
  [0, 1, 2],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 6, 2, 5],
];

interface Props {
  value: number;
  from?: number;
}

const OffSegment = () => <div className={style.segment} />;
const OnSegment = () => <div className={`${style.segment} ${style.on}`} />;

const generatesSegment = (seg: number[]) => (
  <>
    {seg.includes(0) ? <OnSegment /> : <OffSegment />}
    {seg.includes(1) ? <OnSegment /> : <OffSegment />}
    {seg.includes(2) ? <OnSegment /> : <OffSegment />}
    {seg.includes(3) ? <OnSegment /> : <OffSegment />}
    {seg.includes(4) ? <OnSegment /> : <OffSegment />}
    {seg.includes(5) ? <OnSegment /> : <OffSegment />}
    {seg.includes(6) ? <OnSegment /> : <OffSegment />}
    {seg.includes(7) ? <OnSegment /> : <OffSegment />}
  </>
);

const Digit: React.FC<Props> = ({ value, from }) => {
  const [segments, setSegments] = useState<JSX.Element>(<></>);
  useEffect(() => {
    const seg = digitSegments[value];
    const lastSeg = from !== undefined ? digitSegments[from] : [];

    if (!seg) {
      return;
    }

    const lastSegTimeoutIds = lastSeg.map((_, i) =>
      setTimeout(() => {
        setSegments(generatesSegment(lastSeg.slice(i)));
      }, i * 45),
    );

    const segTimeoutIds = seg.map((_, i) =>
      setTimeout(() => {
        setSegments(generatesSegment(seg.slice(0, i + 1)));
      }, 250 + i * 45),
    );

    return () => {
      lastSegTimeoutIds.forEach(clearInterval);
      segTimeoutIds.forEach(clearInterval);
    };
  }, [value]);

  return <div className={style.digit}>{segments}</div>;
};

export default Digit;
