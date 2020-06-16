# JavaScript 30 - Speech Detection 練習

實現收錄語音並顯示語音文本。

## 步驟

- 收音
- 將收到的語音渲染至頁面上

## 步驟詳解
- 收音
  ```javascript
  // 引用語音辨識的 API，並且依瀏覽器的支援程度選用不同的 API
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // 建構一個語音物件，該語音物件包含可供操作的方法
  const recognition = new SpeechRecognition();

  // 是否回傳過渡值，用來取得語音收錄是否告一段落的參數
  recognition.interimResults = true;

  // 設定語言，繁中或英文(美)
  recognition.lang = 'zh-tw' || 'en-US';

  // 執行收音
  recognition.start();

  // 如果收到的語音告一段落，就還是再次啟動收音
  recognition.addEventListener('end', recognition.start);
  ```
- 將收到的語音渲染至頁面上
  ```javascript
  // 宣告一個變數值為 <p> element
  let pTag = document.createElement('p');

  // 選取到 words 節點，就是我們要放入文本的區域
  const words = document.querySelector('.words');
  // 將空內容的 <p> element 放入 word 區域裡
  words.appendChild(pTag);

  //如果有收到語音，就把接到的語音物件轉成可讀的文字
  recognition.addEventListener('result', e => {
    const transcript = [...e.results]
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    // 將文字渲染進 <p> element 內
    pTag.textContent = transcript;

    // 如果收到的語音告一段落，就再新增一個新的 <p> 來接收接下來的語音內容
    if (e.results[0].isFinal) {
      pTag = document.createElement('p');
      words.appendChild(pTag);
    }
  });
  ```