# JavaScript 30 - Event Capture, Propagation, Bubbling and Once 練習

練習事件的捕獲、propagation 方法、冒泡、單一綁定。

## 筆記

- 事件的冒泡與捕獲
  - 觸發事件時，巢狀元素會往內捕獲並往外冒泡。
  - 當我們點擊一個內層元素，它預設的執行順序是，由內往外執行，這就是在冒泡階段的觸發綁定的事件。
- addEventListener 的第三個參數，有下列 option：
  - `capture` 可以用來設定在什麼階段觸發事件，若為 true，則是在捕獲階段觸發事件，所以事件觸發順序是由外往內的。而預設 false，則是指在冒泡階段觸發事件，是由內往外的。
  - `once` 可以用來指定是否為單一綁定事件，若為 true，只會事件只會被觸發一次
  ```javascript
  divs.forEach(div => div.addEventListener('click', printClass, {
    capture: false,
    once: false
  }));
  ```
- 防止傳播
  `e.stopPropagation()` 防止事件在捕獲、冒泡階段傳播。

## 參考資料
- [EventTarget.addEventListener() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Event.stopPropagation() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
- [Event.target | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/target)
- [Event.currentTarget | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/currentTarget)