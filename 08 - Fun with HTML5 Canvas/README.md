# JavaScript 30 - Fun with HTML5 Canvas 練習

做出簡單的小畫家畫筆塗鴉功能，並且可以自動改變筆刷樣式。

## 步驟

- 設置畫布
- 預設筆刷樣式
- 監聽滑鼠狀態
- 塗鴉功能
  1. 塗鴉基本功能
  2. 自動改變筆刷顏色
  3. 自動改變筆刷粗細

## 步驟詳解

- 設置畫布

  ```javascript
  // 取得 canvas element
  const canvas = document.querySelector("#draw");

  // 取得 2d 渲染環境
  const drawCxt = canvas.getContext("2d");

  // 重設畫布的寬高，適應瀏覽器視口的大小
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ```

- 預設｀筆刷樣式
  ```javascript
  drawCxt.strokeStyle = "#bada55"; // 線條顏色
  drawCxt.lineJoin = "round"; // 線條轉彎處為圓弧
  drawCxt.lineCap = "round"; // 線條結尾為圓弧
  drawCxt.lineWidth = 1; // 線條粗度
  ```
- 監聽滑鼠狀態

  ```javascript
  // 預設滑鼠沒按下（還沒動筆畫）
  let isNotdrawing = true;

  // 監聽滑鼠移動
  canvas.addEventListener("mousedown", e => {
  	// 滑鼠按下 -> 在畫
  	isNotdrawing = false;
  	// 更新畫筆開始的座標位置（以免畫筆開始位置是上一個的結束位置）
  	[lastX, lastY] = [e.offsetX, e.offsetY];
  });

  // 監聽滑鼠移動，滑鼠移動就啟動塗鴉功能
  canvas.addEventListener("mousemove", draw);

  // 監聽滑鼠沒按下 -> 沒在畫
  canvas.addEventListener("mouseup", () => (isNotdrawing = true));

  // 監聽滑鼠移出畫布 -> 沒在畫
  canvas.addEventListener("mouseout", () => (isNotdrawing = true));
  ```

- 塗鴉功能

  ```javascript
  function draw(e) {
  	// 如果沒在畫就跳出這個功能
  	if (isNotdrawing) return;
  	// 塗鴉基本功能
  	brushBasic(e);

  	// 顏色自動變化功能
  	brushcolorChanging();

  	// 筆刷粗度自動改變功能
  	brushWidthChanging();
  }
  ```

  1. 塗鴉基本功能

  ```javascript
  function brushBasic(e) {
  	// 線條樣式以 hsl 顏色設置，色相改變，飽和度 100%，亮度 50%
  	drawCxt.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  	// 產生塗鴉路徑
  	drawCxt.beginPath();
  	// 畫筆開始位置
  	drawCxt.moveTo(lastX, lastY);
  	// 從開始畫到滑鼠結束位置
  	drawCxt.lineTo(e.offsetX, e.offsetY);
  	// 畫線條（而非塗滿）
  	drawCxt.stroke();
  	// 更新畫筆座標位置（以免畫筆開始位置一直不變）
  	[lastX, lastY] = [e.offsetX, e.offsetY];
  }
  ```

  2. 自動改變筆刷顏色

  ```javascript
  function brushcolorChanging() {
  	// 色相值遞增並循環
  	hue++;
  	if (hue >= 360) {
  		hue = 0; // 色相初始（0 與 360 都為紅色，讓它成一個色相循環）
  	}
  }
  ```

  3. 自動改變筆刷粗細

  ```javascript
  // 筆刷粗度自動改變功能
  function brushWidthChanging() {
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
  ```
