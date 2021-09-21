import config from './config'
import fetchUrl from './request'
const optionFilter = (obj, key) => {
    // console.log("obj", obj);
    while(key.includes(".")) {
        let key1 = key.split(".")[0];
        if (obj.hasOwnProperty(key1)) {
            obj = obj[key1];
            // console.log("find one", obj);
        } else {
            break;
        }
        let keyArr = key.split(".");
        keyArr.shift();
        // console.log(key, obj, keyArr, keyArr.length, "blablabla");
        if (keyArr.length > 1) {
           key = keyArr.join(".");
        } else {
            key = keyArr[0];
            break;
        }
    }
    if (obj.hasOwnProperty(key)) {
        return obj[key]
    } else {
        console.error(`we do not have ${key}.`);
    }
}
const optionConvert = ({urlTag, queryData, urlOption}) => {
  /*
  *
  *
  props.dispatch({
      type: 'nekohandBlog/fetchCategories',
      payload: {
        urlTag: 'nekohandBlog.postByCategory',
        queryData: {},
      }
    })
  }
  * */
    let configClone = JSON.parse(JSON.stringify(config));
    const configObj = optionFilter(configClone, urlTag);
    // console.log(configObj, "current");
    if (urlOption && urlOption.hasOwnProperty('suffix')) {
        configObj[0] = configObj[0] + '/' + urlOption.suffix;
    }
    return [configObj[0], {
        requestType: configObj[1],
        method: configObj[2],
        data: queryData,
    }];
}
export default {
    fetchUrl,
    config,
    optionConvert,
}
