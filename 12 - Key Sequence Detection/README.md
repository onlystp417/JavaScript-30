# JavaScript 30 - Key Sequence Detection 練習

鍵盤輸入密碼，如果符合預設密碼，就引發驚喜效果。

## 步驟

- 設一組密碼
- 接住使用者從鍵盤輸入的值
- 驗證密碼是否正確

## 步驟詳解

- 設一組密碼
  ```javascript
  // 聲明密碼
  const secretCode = "apple";
  ```
- 接住使用者從鍵盤輸入的值

  ```javascript
  // 在網頁掛上鍵盤監聽
  window.addEventListener("keyup", isCorrectCode);

  // 聲明一個 keyIn 變數去接使用者的輸入
  let keyIn = [];

  // 將接到的 key 值放進 keyIn 陣列
  function isCorrectCode(e) {
  	keyIn.push(e.key);
  }
  ```

- 驗證密碼是否正確

  ```javascript
  // 驗證密碼的功能
  function isCorrectCode(e) {
  	// 將接到的 key 值放進 keyIn 陣列
  	keyIn.push(e.key);

  	// 讓陣列保持在 secretCode 的字數長度，如果超過就從把 index 為 0 值擠出去。
  	keyIn.splice(-secretCode.length - 1, keyIn.length - secretCode.length);
  	console.log(keyIn);

  	// 將 keyIn 轉成字串，如果等於 secretCode 就觸發驚喜
  	if (keyIn.join("") === secretCode) {
  		// 從 www.cornify.com 網站引入的資源，可以呼叫網頁特效
  		cornify_add();
  	}
  }
  ```
