# JavaScript 30 - Follow Along Link Highlighter 練習

實作滑鼠重點指標的動畫效果。

# 步驟

- 做出 highlight 元素
- 監聽要被 highlight 的目標
- highlight 效果

## 步驟詳解

- 做出 highlight 元素
  ```javascript
  // 新增 highlight 元素，並綁定樣式
  const highlight = document.createElement('span');
  highlight.classList.add('highlight');
  // 將 highlight 元素放在 body 層
  document.body.appendChild(highlight);
  ```
- 監聽要被 highlight 的目標
  ```javascript
  // 選取到要被 highlight 的所有目標
  const targets = document.querySelectorAll('a');

  // 在每個目標綁上滑鼠 mouseenter 事件，一觸發就執行 highlightTarget 效果
  targets.forEach(target => 
    target.addEventListener('mouseenter', highlightTarget)
  );
  ```
- highlight 效果功能
  ```javascript
  // 幫單字畫重點的功能
  function highlightTarget() {
    // 取得當前 hover 到的元素的長寬、座標資訊
    const linkCoords = this.getBoundingClientRect();
    // 自己定義座標值
    // 1. width 跟 height 比元素稍寬一點
    // 2. top 跟 left 置中，並且要包含 scroll 數值
    const coords = {
      // 元素長寬 + 8 間距
      width: linkCoords.width + 8,
      height: linkCoords.height + 8,
      // 元素相對視口座標 + scroll 的份量 - 一半間距
      top: linkCoords.top + window.scrollY - 4,
      left: linkCoords.left + window.scrollX - 4
    };
    // 將自定義的座標渲染為 hightlight 樣式
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
  }
  ```

## 參考資料
- [Element.getBoundingClientRect() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
- [mouseenter | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseenter_event)