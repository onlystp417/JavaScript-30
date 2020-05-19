# JavaScript 30 - Custom Video Player 練習

客製化 video 播放介面。

## 步驟

- 基本播放功能（按鍵＋ 按 video）
- 快轉與倒轉功能
- 聲音大小與播放速度條
- 進度條操作

## 步驟詳解

- 基本播放功能（按鍵＋ 按 video）

  ```javascript
  // 取得父元素
  const player = document.querySelector(".player");
  // 透過父元素選到 video
  const video = player.querySelector(".viewer");
  // 透過父元素選到播放按鍵
  const toggle = player.querySelector(".toggle");

  // 監聽 video
  video.addEventListener("click", togglePlay);
  video.addEventListener("play", switchButton);
  video.addEventListener("pause", switchButton);
  // 監聽播放鍵
  toggle.addEventListener("click", togglePlay);

  // 播放功能
  function togglePlay() {
  	const method = video.paused ? "play" : "pause";
  	video[method]();
  }

  // 播放鍵 icon 切換功能
  function switchButton() {
  	const icon = video.paused ? "►" : "❚ ❚";
  	console.log("is run");
  	toggle.textContent = icon;
  }
  ```

- 快轉與倒轉功能

  ```javascript
  // 透過父元素取得快轉與倒轉鈕
  const skipButtons = player.querySelectorAll("[data-skip]");

  // 監聽快轉與倒轉鈕
  skipButtons.forEach(button => button.addEventListener("click", skip));

  // 快轉與倒轉功能
  function skip() {
  	video.currentTime += parseInt(this.dataset.skip);
  }
  ```

- 聲音大小與播放速度條

  ```javascript
  // 透過父元素取得音量鈕與速度控制鈕
  const ranges = player.querySelectorAll(".player__slider");

  // 監聽音量鈕與速度控制鈕的輸入值，以及區間變化值
  ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
  ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

  // 音量與播放速度操作功能
  function handleRangeUpdate() {
  	video[this.name] = this.value;
  }
  ```

- 進度條操作

  ```javascript
  // 透過父元素取得整個進度元素
  const progress = player.querySelector(".progress");
  // 透過進度元素取得內部的進度條
  const progressBar = progress.querySelector(".progress__filled");

  // 聲明一個是否在操作的變量
  let isHandling = false;

  // 監聽 video 播放進度
  video.addEventListener("timeupdate", handleProgress);
  // 監聽進度操作
  progress.addEventListener("click", drag);
  progress.addEventListener("mousemove", e => isHandling && drag(e));
  progress.addEventListener("mousedown", () => (isHandling = true));
  progress.addEventListener("mouseup", () => (isHandling = false));

  // 進度條顯示功能
  function handleProgress() {
  	const percent = (video.currentTime / video.duration) * 100;
  	progressBar.style.flexBasis = `${percent}%`;
  }

  // 進度條拖曳功能
  function drag(e) {
  	const dragTime = (e.offsetX / progress.offsetWidth) * video.duration;
  	video.currentTime = dragTime;
  }
  ```

## 參考資料

- [HTMLMediaElement - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
- [HTMLMediaElement: play event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event)
- [HTMLMediaElement: pause event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event)
- [MouseEvent.offsetX - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX)
- [HTMLElement.offsetWidth - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
