import AllConfig from '../service';
const handleData = (data) => {
  if (!data) {
    return [];
  }
  data.forEach((item, index) => {
      let nm = decodeURIComponent(item.fileName).match(/^(.+)\.(mp3|flac)$/)[1].trim();
      let rp = decodeURIComponent(item.relativePath).split('/');
      let rootUrl = item["FileNo"]<2073?"https://file.ecs32.top/data/music":"https://file.ecs32.top/data";
      let matchIndex = nm.match(/^(.\d+)\.(.*)$/);
      console.log(matchIndex);
      if (matchIndex) {
        if (matchIndex.length > 2) {
          item.name = matchIndex[2];
        }
      } else {
        item.name = nm;
      }
      item.artist = AllConfig.config.artist[rp[rp.length-3]] || rp[rp.length-3];
      if (item.artist.includes("[")) {
        item.artist = "Million Stars";
      }
      item.album = rp[rp.length-2];
      item.url = rootUrl + data[index].src;
      item.cover = rootUrl + data[index].relativePath + "cover.jpg";
      item.lrc = null;
  });
  return data;
}
export default handleData;
