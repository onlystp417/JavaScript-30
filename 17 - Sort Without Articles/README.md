# JavaScript 30 - Sort Without Articles 練習

以字母順序排序陣列內的樂團名，但需忽略冠詞。

```javascript
const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog'
];
```

## 步驟

- 用正則方法忽略冠詞
- 以字母順序排序陣列內的樂團
- 將排序好的陣列渲染至頁面清單上

## 步驟詳解

- 用正則方法忽略冠詞
  ```javascript
  // 忽略冠詞的功能
  function ignoreArticle(band) {
    // 宣告如果開頭符合 "a " 或 "an " 或 "the " ，且忽略大小寫的的正則常數
    const isArticle = /^(a |an |the )/i;
    // 將樂團名稱的冠詞拿掉，並刪除前後的空格（正則已過濾掉空格，所以非必要）
    return band.replace(isArticle, '').trim();
  }
  ```
- 以字母順序排序陣列內的樂團

  ```javascript
  // 用 .sort() 方法排序，並透過忽略冠詞的功能來比較內部值，字母順序後者返回 1；反之為 -1
  bands.sort((a, b) => (ignoreArticle(a) > ignoreArticle(b) ? 1 : -1));
  ```

- 將排序好的陣列渲染至頁面清單上

  ```javascript
  // 選取到清單元素
  const bandList = document.querySelector('#bands');
  // 在清單元素內放入已排序好的樂團名稱，渲染至頁面
  bandList.innerHTML = bands.map(band => `<li>${band}</li>`).join('');
  ```

## 參考資料

- [String.prototype.trim() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
- [Regular expressions | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Array.prototype.sort() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
