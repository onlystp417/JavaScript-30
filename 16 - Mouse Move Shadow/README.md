# JavaScript 30 - Mouse Shadow 練習

實現滑鼠軌跡動畫。

## 步驟

- 取得 DOM 節點
- 取得移動範圍
- 取得滑鼠移動數值
- 算出影子移動值並渲染在畫面上

## 步驟詳解

- 取得 DOM 節點
  ```javascript
  // 取得 DOM 節點
  const moveScope = document.querySelector('.moveScope'); // 移動範圍
  const text = moveScope.querySelector('h1'); // 移動目標
  ```
- 取得移動範圍

  ```javascript
  function fantacyShadow(e) {
    // 取得移動範圍的長寬
    const scopeWidth = moveScope.offsetWidth;
    const scopeHeight = moveScope.offsetHeight;
  }
  ```

- 取得滑鼠移動數值

  ```javascript
  function fantacyShadow(e) {
    // 取得移動範圍的長寬
    const scopeWidth = moveScope.offsetWidth;
    const scopeHeight = moveScope.offsetHeight;

    // 取得滑鼠移動座標
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    // 讓滑鼠位移座標得以延續（排除滑在 h1 element 上會歸零計算的可能）
    if (this !== e.target) {
      mouseX += e.target.offsetLeft;
      mouseY += e.target.offsetTop;
    }
  }
  ```

- 算出影子移動值並渲染在畫面上

  ```javascript
  function fantacyShadow(e) {
    // 取得移動範圍的長寬
    const scopeWidth = moveScope.offsetWidth;
    const scopeHeight = moveScope.offsetHeight;

    // 取得滑鼠移動座標
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    // 讓滑鼠位移座標得以延續（排除滑在 h1 element 上會歸零計算的可能）
    if (this !== e.target) {
      mouseX += e.target.offsetLeft;
      mouseY += e.target.offsetTop;
    }

    // 做出影子效果
    makingShadow(scopeWidth, scopeHeight, mouseX, mouseY);
  }

  // 影子效果功能
  function makingShadow(scopeWidth, scopeHeight, x, y) {
    // 宣告移動單位
    const move = 200;

    // 宣告移動座標值 （總移動座標值 - 中心座標值）
    const xMove = Math.round((x / scopeWidth) * move) - move / 2;
    const yMove = Math.round((y / scopeHeight) * move) - move / 2;

    // 將影子效果渲染至頁面
    text.style.textShadow = `
    ${xMove}px ${yMove}px #7878aa,
    ${-xMove}px ${yMove}px #aa8787,
    ${yMove}px ${-xMove}px #04295a,
    ${-yMove}px ${xMove}px #ca2590
  `;
  }
  ```

## 參考資料

- [this | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/this)
- [Event.target | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/target)
- [What's the difference between this, event.currentTarget, and event.target?](https://discuss.codecademy.com/t/whats-the-difference-between-this-event-currenttarget-and-event-target/395223)
- [HTMLElement.offsetLeft | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft)
- [HTMLElement.offsetTop | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)
- [Math.round() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
