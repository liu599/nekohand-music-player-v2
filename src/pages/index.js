import React from "react";
import styles from './index.css';
import Player from '../components/player/player';

export default function IndexPage() {
  return (
    <div style={{padding: 8}}>
      <Player className={styles.normal} />
    </div>
  );
}
