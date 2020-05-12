# JavaScript 30 - JS and CSS Clock 練習

## 步驟

- 指針歸零
- 取得當前時間
- 渲染秒針 / 分針 / 時針角度
- 每秒更新當前時間
- 解決秒針閃動問題

## 步驟詳解

- 指針歸零
  ```css
  .hand {
    // 讓指針停在 90 度（歸零）
    transform: rotate(90deg);
    // 指針旋轉軸心為右側點
    transform-origin: right;
  }
  ```
- 取得當前時間
  ```javascript
  // 建立一個時間物件
  const currentTime = new Date();
  ```
- 渲染秒針 / 分針 / 時針角度

  ```javascript
  function setTime() {
    const currentTime = new Date();
    // 取得秒數與秒針角度
    const seconds = currentTime.getSeconds();
    const secondHandDeg = (seconds / 60) * 360 + 90;

    // 解決秒針在 0 秒時的閃動
    secondHandStable(secondHandDeg);
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
  ```

- 每秒更新當前時間
  ```javascript
  // 每 1000 毫秒執行一次 setTime function
  setInterval(setTime, 1000);
  ```
- 解決秒針閃動問題
  因為動畫效果，秒針指到 0 秒（90 度）時，會有 0.05s 轉回 59 秒處再轉回 0 秒的閃現，用判斷式排除秒針在 0 秒時的動畫效果，可以解決該問題。
  ```javascript
  function secondHandStable(secondHandDeg) {
    if (secondHandDeg === 90) {
      secondHand.style.transition = "all 0s";
    } else {
      secondHand.style.transition = "all 0.05s";
    }
  }
  ```
