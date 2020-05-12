# JavaScript 30 - CSS Variables 練習

## 步驟

- 宣告 CSS 全域變數
- 為 input 掛上監聽事件
- 將接收到的 input 值渲染至畫面

## 步驟詳解

- 宣告 CSS 全域變數

  ```css
  /* 於根元素宣告全域變數 */
  :root {
    --color: #888;
    --spacing: 10px;
    --blur: 0px;
  }

  /* 指定要渲染的元素，並把變數放進屬性值中 */
  .graphic {
    padding: var(--spacing);
    background: var(--color);
    filter: blur(var(--blur));
  }

  .highlight {
    color: var(--color);
  }
  ```

- 為 input 掛上監聽事件

  ```javascript
  // 選到所有的 input
  const inputs = document.querySelectorAll(".controls input");

  // 掛上輸入值監聽，當接收到輸入值，就執行 styleChanging 功能
  inputs.forEach((input) => input.addEventListener("change", styleChanging));

  // 掛上操作中的值監聽，操作中的值被接收到，就執行 styleChanging 功能
  inputs.forEach((input) => input.addEventListener("mousemove", styleChanging));
  ```

- 將接收到的 input 值渲染至畫面
  ```javascript
  // 變更樣式的功能
  function styleChanging() {
    // 取得自定義的 deta-* 值，如果沒有就回傳空字串
    const unit = this.dataset.sizing || "";
    // 在根元素指定行內樣式（屬性, 屬性值）
    document.documentElement.style.setProperty(
      `--${this.name}`,
      `${this.value}${unit}`
    );
  }
  ```
