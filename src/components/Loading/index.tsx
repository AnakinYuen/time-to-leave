import React from 'react';
import './animation.scss';
import style from './style.module.scss';

const Loading: React.FC = () => (
  <div className={style.loading}>
    <div className={style.part}></div>
    <div className={style.part}></div>
    <div className={style.part}></div>
    <div className={style.part}></div>
    <div className={style.part}></div>
    <div className={style.part}></div>
    <div className={style.part}></div>
    <div className={style.part}></div>
  </div>
);

export default Loading;
