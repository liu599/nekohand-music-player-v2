import AllConfig from '../service';
const handleData = (data) => {
  if (!data) {
    return [];
  }
  data.forEach((item, index) => {
      let nm = decodeURIComponent(item.fileName).match(/^(.+)\.(mp3|flac)$/)[1].trim();
      let rp = decodeURIComponent(item.relativePath).split('/');
      let rootUrl = item["FileNo"]<2073?"https://file.ecs32.top/data/music":"https://file.ecs32.top/data";
      let s2 = nm.split(".")
      let s3 = ""
      if (s2.length > 2) {
        s2.forEach((ss,w) => {
          if (w !== 0) {
            s3 += ss
          }
        })
      } else if (s2.length === 2) {
        s3 = s2[1]
      } else {
        s3 = nm;
      }
      item.name = s3;
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
