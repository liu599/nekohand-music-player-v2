import lodash from 'lodash';
import {produce} from 'immer';
import {FetchPlayerList} from '../service/playerService';
import handleData from './modelData';
const setDelay = (payload) => {
  const millisecond = 300;
  return new Promise((resolve, reject)=>{
    if (typeof millisecond != 'number') reject(new Error('参数必须是number类型'));
    setTimeout(()=> {
      resolve(`我延迟了${millisecond}毫秒后输出的, 输出 ${JSON.stringify(payload)}`)
    }, millisecond)
  })
}
export default {
  namespace: 'player',
  state: {
    allplayerlist: [],
    playerlist: [],
    currentLyric: '',
    artists: [],
  },
  reducers: {
    filterPlayerList(state, {payload: data}) {
      if (data.name === "all") {
        return produce(state, draft => {
          draft.playerlist = draft.allplayerlist;
        })
      }
      return produce(state, draft => {
        draft.playerlist = draft.allplayerlist.filter((ar, idx, arry) => {
          return data.name.includes(ar.artist);
        });
      });
    },
    savePlayerList(state, {payload: data}) {
      const savedData = handleData(data);
      return produce(state, draft => {
        draft.playerlist.push(...savedData);
        draft.allplayerlist.push(...savedData);
      });
    },
    saveCurrentLyric(state, {payload: currentLyric}) {
      // console.log('Get Current Lyric');
      return produce(state, draft => {
        draft.currentLyric = currentLyric;
      });
    }
  },
  effects: {
    *fetchData(action, { call, put, fork, select }) {
      let {data} = yield call(FetchPlayerList, action.payload);
      // yield call(console.log, data);
      const {data: flac} = yield call(FetchPlayerList, {
        urlTag: 'playerlist',
        queryData: {
          fileType: "flac",
        },
      });
      data = [...data, ...flac];
      yield put({type: "savePlayerList", payload: data});
    },
    *fetchSongInfo(action, { call, put, fork, select }) {
      let response = yield call(FetchPlayerList, action.payload);
      yield call(console.log, response);
      if (response.hasOwnProperty('data')) {
        yield put({type: "saveCurrentLyric", payload: response.data.lrc});
      } else {
        // search again for the untrimmed string.
        action.payload.queryData.SongName =
          action.payload.queryData.SongName.trim();
        response = yield call(FetchPlayerList, action.payload);
        if (response.hasOwnProperty('data')) {
          yield put({type: "saveCurrentLyric", payload: response.data.lrc});
        }
      }
    },
    *filterData(action, {call, put, fork, select}) {
      yield call(setDelay, action.payload);
      yield put({type: "filterPlayerList", payload: action.payload});
    }
  },
}
