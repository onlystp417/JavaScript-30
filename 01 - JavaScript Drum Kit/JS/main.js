// 掛按鍵監聽
window.addEventListener("keydown", playsound);

// 按鍵觸發的效果
function playsound(e) {
  const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!sound) return;

  // 在 key 元素上加上按鍵觸發動畫
  key.classList.add("playing");

  // 把 sound 初始化，才能多次播放
  sound.currentTime = 0;

  // 播放聲音
  sound.play();
}

// 按鍵樣式初始
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

// 選到每個 key 並掛上監聽
const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
});
