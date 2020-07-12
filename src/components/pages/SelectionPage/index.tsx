import React from 'react';
import { Link } from 'gatsby';
import SEO from 'src/components/seo';
import Layout from 'src/components/Layout';
import { getRandomInt } from 'src/utils/random';
import style from './style.module.scss';

const arriveMp4 = [
  'https://media.tenor.com/videos/a4a2bd4a237c3ce948d6c2c3c4197e50/mp4',
  'https://media.tenor.com/videos/24b46db5c90570a7748d0a339dbc7f2b/mp4',
  'https://media.tenor.com/videos/f051540089c557e374449d48ae91fe2b/mp4',
  'https://media.tenor.com/videos/bd9b3c09c0cec75691f0a969ac085a73/mp4',
  'https://media.tenor.com/videos/34a178cb3587748de021db9c4a1a906f/mp4',
];

const leaveMp4 = [
  'https://media.tenor.com/videos/d6c6d4507bf793b9d656993d547df20b/mp4',
  'https://media.tenor.com/videos/13eb0dbddb5d66933e29bb07373c130d/mp4',
  'https://media.tenor.com/videos/188b06e2a47f0fe561f34aa5d79f599d/mp4',
  'https://media.tenor.com/videos/d1f9f12d898c005bd1acc8cf68e13783/mp4',
  'https://media.tenor.com/videos/aef2bfeb2e0f68647de58d94fde37fec/mp4',
];

const play = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
  const video = e.target as HTMLVideoElement | null;
  if (video) {
    video.play();
  }
};

const pause = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
  const video = e.target as HTMLVideoElement | null;
  if (video && video.played.length) {
    video.pause();
  }
};

const SelectionPage: React.FC = () => {
  const arriveMp4Index = getRandomInt(0, arriveMp4.length - 1);
  const leaveMp4Index = getRandomInt(0, leaveMp4.length - 1);
  return (
    <Layout className={style.main}>
      <SEO title="Home" />
      <Link to="/set-arrive" className={style.button} data-text="Arrive">
        <video
          src={arriveMp4[arriveMp4Index]}
          loop
          muted
          playsInline
          controls={false}
          onMouseEnter={play}
          onMouseOut={pause}
        />
      </Link>
      <Link to="/set-leave" className={style.button} data-text="Leave">
        <video
          src={leaveMp4[leaveMp4Index]}
          loop
          muted
          playsInline
          controls={false}
          onMouseEnter={play}
          onMouseOut={pause}
        />
      </Link>
      <h1 className={style.title}>When you ... ?</h1>
    </Layout>
  );
};

export default SelectionPage;
