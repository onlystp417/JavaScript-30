//間隔定時器，每秒更新時間
setInterval(setTime, 1000);
const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setTime() {
  const currentTime = new Date();
  // 取得秒數與秒針角度
  const seconds = currentTime.getSeconds();
  const secondHandDeg = (seconds / 60) * 360 + 90;

  // 解決秒針在 0 秒時的閃動
  if (secondHandDeg === 90) {
    secondHand.style.transition = "all 0s";
  } else {
    secondHand.style.transition = "all 0.05s";
  }
  secondHand.style.transform = `rotate(${secondHandDeg}deg)`;

  // 取得分鐘數與分針角度
  const min = currentTime.getMinutes();
  console.log(min);
  const minHandDeg = (min / 60) * 360 + 90;
  minHand.style.transform = `rotate(${minHandDeg}deg)`;

  // 取的時數與時針角度
  const hour = currentTime.getHours();
  const hourHandDeg = (hour / 12) * 360 + 90;
  console.log(hour);
  hourHand.style.transform = `rotate(${hourHandDeg}deg)`;
}
