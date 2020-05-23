// 取得格式化後的時間，並於 console 印出
const totalTime = timeFormat(caculateSeconds);
console.log(totalTime);

// 計算所有影片秒數的功能
function caculateSeconds() {
  // 取得影片清單並轉為陣列
  const videoList = Array.from(document.querySelectorAll('[data-time]'));
  // 將該陣列內的時間轉換成總秒數
  const caculatedResult = videoList
    // 取得每個影片的時間
    .map(video => video.dataset.time)
    // 取得每個影片的分數、秒數，再計算出每個影片的秒數
    .map(time => {
      const [min, sec] = time.split(':').map(timeStr => parseFloat(timeStr));
      return min * 60 + sec;
    })
    // 加總所有影片的秒數
    .reduce((totalSeconds, perVideoSec) => totalSeconds + perVideoSec);
  // 回傳總秒數
  return caculatedResult;
}

function timeFormat(fun) {
  // 計算出所有個影片秒數
  const totalSeconds = caculateSeconds();

  // 宣告剩餘秒數的區域變數
  let secondsLeft = totalSeconds;
  // 取得時數
  const hours = Math.floor(secondsLeft / 3600);

  // 扣除時數後剩餘的秒數
  secondsLeft = totalSeconds % 3600;
  // 取得分數
  const min = Math.floor(secondsLeft / 60);

  // 扣除分數後取得秒數
  const sec = totalSeconds % 60;

  // 回傳格式化時間
  return `影片總時數為 ${hours}:${min}:${sec}`;
}
