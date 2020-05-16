// 取得 canvas element
const canvas = document.querySelector("#draw");

// 取得 2d 渲染環境
const drawCxt = canvas.getContext("2d");

// 重設畫布的寬高，適應瀏覽器視口的大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 設定線條樣式
drawCxt.strokeStyle = "#bada55"; // 線條顏色
drawCxt.lineJoin = "round"; // 線條轉彎處為圓弧
drawCxt.lineCap = "round"; // 線條結尾為圓弧
drawCxt.lineWidth = 1; // 線條粗度

// 預設滑鼠沒按下（還沒動筆畫）
let isNotdrawing = true;

// 設置滑鼠座標
let lastX = null;
let lastY = null;

// 色相初始
let hue = 0;

// 畫筆粗度遞增或遞減(預設 true 為遞增)
let increaseDirection = true;

// 塗鴉功能
function draw(e) {
	// 如果沒在畫就跳出這個功能
	if (isNotdrawing) return;
	// 畫筆渲染
	brushStyle(e);

	// 顏色自動變化功能
	colorChanging();

	// 筆刷粗度自動改變功能
	brushWidth();
}

// 畫筆渲染
function brushStyle(e) {
	drawCxt.strokeStyle = `hsl(${hue}, 100%, 50%)`; // 線條樣式以 hsl 顏色設置，色相改變，飽和度 100%，亮度 50%
	drawCxt.beginPath(); // 產生塗鴉路徑
	drawCxt.moveTo(lastX, lastY); // 畫筆開始位置
	drawCxt.lineTo(e.offsetX, e.offsetY); // 從開始畫到滑鼠結束位置
	drawCxt.stroke(); // 畫線條（而非塗滿）
	[lastX, lastY] = [e.offsetX, e.offsetY]; // 更新畫筆座標位置（以免畫筆開始位置一直不變）
}

// 顏色自動變化功能
function colorChanging() {
	// 色相值遞增並循環
	hue++;
	if (hue >= 360) {
		hue = 0; // 色相初始（0 與 360 都為紅色，讓它成一個色相循環）
	}
}

// 筆刷粗度自動改變功能
function brushWidth() {
	// 線條粗度遞增&遞減於固定範圍
	// 遞增到 100 就會將 increaseDirection 反轉為 false
	if (drawCxt.lineWidth === 100 || drawCxt.lineWidth === 1) {
		increaseDirection = !increaseDirection;
	}
	// increaseDirection 初始為 true，會先遞增，若經反轉為 false，則遞減
	if (increaseDirection) {
		drawCxt.lineWidth++;
	} else {
		drawCxt.lineWidth--;
	}
}

// 在畫布上掛上滑鼠移動監聽
canvas.addEventListener("mousedown", e => {
	// 滑鼠按下 -> 在畫
	isNotdrawing = false;
	// 更新畫筆開始的座標位置（以免畫筆開始位置是上一個的結束位置）
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw); // 滑鼠移動就啟動塗鴉功能
canvas.addEventListener("mouseup", () => (isNotdrawing = true)); // 滑鼠沒按下 -> 沒在畫
canvas.addEventListener("mouseout", () => (isNotdrawing = true)); // 滑鼠不在畫布上 -> 沒在畫
