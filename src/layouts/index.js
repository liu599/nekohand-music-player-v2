import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.less';
import {
  Link,
} from 'umi';
import config from '../service/config';


function BasicLayout(props) {
  const dispatch = useDispatch();
  const allArtists = Object.values(config.artist);
  allArtists[0] = "Million Stars";
  const onChangeList = (item) => {
    console.log(item);
    dispatch({
      type: "player/filterData",
      payload: {
        name: item,
      },
    });
  }

  return (
    <div className={styles.normal}>
      <div className={styles.footer}>
        <h4 style={{padding: 8, margin: 0}}>Nekohand Music Player 2.1</h4>
      </div>
      <div style={{padding: 8, height: 80}}>
        <p className={styles.container}>
          <span>List:</span>
          <span>
            <Link to={"#"} onClick={()=>onChangeList("all")}>
            All
          </Link>
          </span>
          {allArtists.map((item, idx) => {
            return (
              <span key={`xsk-${idx}`}>
                <Link to={"#"} onClick={()=>onChangeList(item)}>
                  {item}
                </Link>
              </span>
            );
          })}
          <span><Link to={"#"} onClick={()=>onChangeList(4)}>Enter</Link></span>
        </p>
      </div>
      <div className={styles.main}>
        {props.children}
      </div>
      <footer className={styles.footer}>
        <div className={styles.footContainer}>
          <p>
            Based on <a href="https://github.com/sabrinaluo/react-aplayer" target={"_blank"}>React-APlayer</a>
          </p>
          <p>
            © 2019-2022 Modified by Nekohand 公式サイト委員會/EC小站 {APP_VERSION}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default BasicLayout;
