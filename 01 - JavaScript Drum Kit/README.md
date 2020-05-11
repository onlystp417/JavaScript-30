# JavaScript 30 - Drum Kit 練習

## 步驟

- 全域物件掛鍵盤監聽
- 按下按鍵：
  - 播放聲音
  - 按鍵樣式改變
- 按鍵樣式初始化

## 步驟詳解

- 全域物件掛鍵盤監聽
  ```javascript
  // 按鍵被按下，就執行播放聲音的 function
  window.addEventListener("keydown", playsound);
  ```
- 按下按鍵：

  - 播放聲音
  - 按鍵樣式改變

  ```javascript
  function playsound(e) {
    // 選到相應的 keyCode audio
    const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    // 選到相應的 keyCode div
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    // 擋掉使用者按下未定義的 audio
    if (!sound) return;

    // 在 key 元素上加上按鍵播放樣式
    key.classList.add("playing");

    // 把 sound 初始化，才能多次播放
    sound.currentTime = 0;

    // 播放聲音
    sound.play();
  }
  ```

- 按鍵樣式初始化

  - 先選到每個 key（會返回一個元素陣列），再用 forEach 遍歷，掛上監聽事件

    ```javascript
    const keys = document.querySelectorAll(".key");

    // 當動畫效果結束後，執行 removeTransition funciton
    keys.forEach((key) => {
      key.addEventListener("transitionend", removeTransition);
    });
    ```

  - 拿掉按鍵效果的 function

    ```javascript
    function removeTransition(e) {
      // 如果是未定義的按鍵，就擋掉
      if (e.propertyName !== "transform") return;

      // 拿掉當前按下的 key 的播放樣式
      this.classList.remove("playing");
    }
    ```
