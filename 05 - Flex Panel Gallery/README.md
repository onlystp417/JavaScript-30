# JavaScript 30 - Flex Panel Gallery 練習

## 步驟

- CSS 樣式
- 在 panel 元素上掛監聽事件
- 按下去 panel 撐開、標題字放大的動畫
- 第一個動畫跑完，上下標題滑進來的動畫

## 步驟詳解

- CSS 樣式

  - 用 flex 排版
  - 動畫的樣式

    ```css
    // 按下去 panel 撐開、標題字放大
    .panel.open {
      font-size: 40px;
      flex: 5;
    }

    // 預設將上下標題上下移至區塊外
    .panel > *:first-child {
      transform: translateY(-100%);
    }
    .panel > *:last-child {
      transform: translateY(100%);
    }
    // 上下標題滑進來
    .panel.open-active > *:first-child {
      transform: translateY(0%);
    }
    .panel.open-active > *:last-child {
      transform: translateY(0%);
    }
    ```

- 在 panel 元素上掛監聽事件

  ```javascript
  // 選到所有的 panel 元素
  const panels = document.querySelectorAll(".panel");

  // 當點擊 panel 區塊時，觸發 toggleOpen 動畫
  panels.forEach((panel) => panel.addEventListener("click", toggleOpen));

  // 當 toogleOpen 動畫跑完當下，觸發 toggleOpenActive 動畫
  panels.forEach((panel) =>
    panel.addEventListener("transitionend", toggleOpenActive)
  );
  ```

- 按下去 panel 撐開、標題字放大的動畫
  ```javascript
  // 區塊撐開字放大的動畫
  function toggleOpen() {
    this.classList.toggle("open");
  }
  ```
- 第一個動畫跑完，上下標題滑進來的動畫
  ```javascript
  // 上下標題滑進來的動畫
  function toggleOpenActive(e) {
    // 當 open 動畫跑完，該元素有 flex-grow 這個 CSS 屬性時，才加入 open-active class
    if (e.propertyName.includes("flex-grow")) {
      this.classList.toggle("open-active");
    }
  }
  ```
