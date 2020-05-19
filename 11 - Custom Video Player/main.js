// 取得 DOM 節點
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = progress.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
ranges.forEach(range => console.log(range));
const skipButtons = player.querySelectorAll("[data-skip]");

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

// 進度條功能
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

// 音量與播放速度操作功能
function handleRangeUpdate() {
	video[this.name] = this.value;
}

// 快轉與倒轉功能
function skip() {
	video.currentTime += parseInt(this.dataset.skip);
}

// 拖曳進度條功能
function drag(e) {
	const dragTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = dragTime;
}

// video 監聽
video.addEventListener("click", togglePlay);
video.addEventListener("play", switchButton);
video.addEventListener("pause", switchButton);
video.addEventListener("timeupdate", handleProgress);

// 操作鈕監聽
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

// 拖曳進度條監聽
let isHandling = false;
progress.addEventListener("click", drag);
progress.addEventListener("mousemove", e => isHandling && drag(e));
progress.addEventListener("mousedown", () => (isHandling = true));
progress.addEventListener("mouseup", () => (isHandling = false));
