import React from 'react';
import { getRandomInt } from 'src/utils/random';
import style from './style.module.scss';

const images = [
  'https://media1.tenor.com/images/697c02d54469519ed47cb360cb01fd1c/tenor.gif',
  'https://media1.tenor.com/images/57e737c59a977cf5c96ed9fcae3de0a3/tenor.gif?itemid=12424853',
  'https://media1.tenor.com/images/781bf474b656206c7783b9bce60caca9/tenor.gif?itemid=16805926',
  'https://media1.tenor.com/images/93653f133ea1177d26b27f92fc62bbae/tenor.gif?itemid=16815689',
  'https://media1.tenor.com/images/41f87cf82c060f16f851057f44aa8886/tenor.gif?itemid=10392399',
  'https://media1.tenor.com/images/ff27d29959fdc8e03ed351e75827c1eb/tenor.gif?itemid=16274975',
];

const EndPage: React.FC = () => {
  const src = images[getRandomInt(0, images.length - 1)];
  return (
    <div
      className={style.main}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${src})`,
      }}
    >
      <h1 className={style.title}>TIME TO LEAVE</h1>
    </div>
  );
};

export default EndPage;
