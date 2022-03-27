import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import lodash from 'lodash';
import Aplayer from 'react-aplayer';
import styles from './player.less';

import Loading from "../loading/loading";

import "lu2/theme/edge/css/common/ui/Button.css";

let playerInstance;
export default function Player() {

  const dispatch = useDispatch();
  const {loading, sampleState, player, currentLrc} = useSelector(stores => ({
    loading: stores.loading,
    sampleState: stores.sample,
    player: stores.player,
    currentLrc: stores.player.currentLyric,
  }))


  const onInit = (control) => {
    // console.log(control, "setControl");
    playerInstance = control;
    if (window) {
      window.playerInstance = control;
    }
  }
  const onPlay = () => {
    // console.log('onPlay');
  }
  const onLoadStart = () => {

    const currentIndex = playerInstance.list.index;
    const playlist = playerInstance.list.audios;

    dispatch({
      type: "player/fetchSongInfo",
      payload: {
        urlTag: 'audioInfo',
        queryData: {
          SongName: playlist[currentIndex].name,
        },
      }
    });
  }

  const renderAplayer = (data) => {
    // console.log('rendering a new Aplayer', playerInstance);
    if (loading.effects["player/filterData"]) {
      return <Loading />;
    }
    return data.length < 1  ?
      <Loading /> :
      <Aplayer
        autoplay={false}
        theme={'red'}
        loop={'all'}
        preload={'auto'}
        volume={0.7}
        mutex={true}
        listFolded={false}
        listMaxHeight={'200px'}
        async={true}
        lrcType={1}
        onLoadstart={onLoadStart}
        onInit={onInit}
        onPlay={onPlay}
        audio={lodash.cloneDeep(data)}
      />
  };

  const nextMusic= () => {
    playerInstance.skipForward();
  }

  const fetchData= () => {
    dispatch({
      type: "player/fetchData",
      payload: {
        urlTag: 'playerlist',
        queryData: {
          fileType: "mp3",
        },
      }
    });
  }


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log('lrc changed');
    if (!playerInstance || !playerInstance.list || playerInstance.list.length < 1) {
      return;
    }
    const currentIndex = playerInstance.list.index;
    const playlist = playerInstance.list.audios;
    const lrcObj = playerInstance.lrc;
    const parsedLrcs = playerInstance.lrc.parsed;
    if (playlist.length < 1) {
      return;
    }
    playlist[currentIndex].lrc = currentLrc;
    parsedLrcs[currentIndex] = lrcObj.parse(currentLrc);
    lrcObj.player = Object.assign({}, playerInstance);
    lrcObj.switch(currentIndex);

  }, [currentLrc]);

  return (
    <div className={styles.playerContainer}>

      <div style={{maxHeight: 420}}>
        { renderAplayer(player.playerlist) }

        <button
          onClick={()=>nextMusic()}
          className="ui-button" is="ui-button" data-type="primary">Next</button>
      </div>

    </div>
  );
}
