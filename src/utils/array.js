import lodash from 'lodash';
export function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function convertTimeStamp(timestamp) {
  // return new Date(timestamp * 1000).toISOString().replace(/[a-zA-Z]/g, ' ').slice(0, -5);
  return new Date(timestamp * 1000)
    .toLocaleString('zh-Hans', { hour12: false })
    .replace(/[a-zA-Z]/g, ' ').slice(0, -8)
}


/**
 * 作用将扁平状存储的数组转换成树结构
 * @id: 节点键id
 * @pid: 父节点键id
 * @example-input: {
      id: '1'
    }, {
      id: '2',
      pid: '1',
    },{
      id: '5'
    }
 * @example-output: {id: "1", children: [{
      id: '2',
      pid: '1',
    }, {
      id: '5'
    }]}
 * **/
export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  const data = lodash.cloneDeep(array);
  const result = [];
  const hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

export function shuffleArray(arr) {
  if (arr.length < 13) {
    return arr;
  }
  // Fisher-Yates
  for (let i = 1; i < arr.length; i++) {
    const random = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
  return arr
}

export function findKeyNameInArray(keyName, search, arr) {
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].hasOwnProperty(keyName)) {
      if (arr[i][keyName] === search) {
        return arr[i];
      }
    }
  }
}
