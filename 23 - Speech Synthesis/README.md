# JavaScript 30 - Speech Synthesis 練習

實現語音朗讀功能。

# 步驟

- 引用 SpeechSynthesis API
- 取得 DOM 節點
- 取得 SpeechSynthesis 提供的語音列表
- 選擇語音列表功能
- 語音速度與音調調整、讀取輸入的文字功能
- 朗讀功能

## 步驟詳解

- 引用 SpeechSynthesis API
  ```javascript
  // 向語音 API 請求語音接口，透過這個接口來操作語音功能
  const msg = new SpeechSynthesisUtterance();
  ```
- 取得 DOM 節點
  ```javascript
  // 取得頁面上的語音列表下拉選單
  const voicesDropdown = document.querySelector('[name="voice"]');
  // 取得所有的 input
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  // 取得朗讀按鈕
  const speakButton = document.querySelector('#speak');
  // 取得停止朗讀按鈕
  const stopButton = document.querySelector('#stop');
  ```
- 取得 SpeechSynthesis 提供的語音列表
  ```javascript
  // 初始化語音列表陣列
  let voices = [];

  // 因為語音列表是非同步取得的，等語音列表異步確認後，
  // 才觸發 'voiceschanged'，然後執行 populationList（取得語音列表）
  speechSynthesis.addEventListener('voiceschanged', populationList);

  // 在頁面上顯示語音列表的功能
  function populationList() {
    // 取得語音列表
    voices = this.getVoices();
    // 把語音列表渲染至下拉選單中
    voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`);
  }
  ```
- 選擇語音列表功能
  ```javascript
  // 在下拉選單綁定 change 事件，只要值有改變，就執行 setVoice
  voicesDropdown.addEventListener('change', setVoice);

  // 將選定的語音值放入語音物件中，只要一選定就朗讀文字
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    readText();
  }
  ```
- 語音速度與音調調整、讀取輸入的文字功能
  ```javascript
  // 將每個 input 綁上 change 事件，只要值改變就執行 setOption
  options.forEach(option => option.addEventListener('change', setOption));

  // 將滑軌的值與 input 文字內容放入語音物件中，只要值一改變，就朗讀文字
  function setOption() {
    // input 的 name 正好對應著語音接口的 rate、pitch、text 屬性，
    // 如此一來當前的變動值就會存進相應的屬性內
    msg[this.name] = this.value;
    // 接著執行朗讀功能
    readText();
  }
  ```
- 語音朗讀功能
  ```javascript
  // 綁定朗讀按鈕，按下去就執行 readText
  speakButton.addEventListener('click', readText);
  // 綁定停止朗讀按鈕，按下去就執行 readText，並指定 startOver 為 false
  stopButton.addEventListener('click', () => readText(false));

  // 朗讀文字的功能，並給予預設參數 startOver 為 true
  function readText(startOver = true) {
    // 先停掉上一個朗讀
    speechSynthesis.cancel();
    // 如果 startOver 為 true 就朗讀
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }
  ```

## 參考資料
- [SpeechSynthesis | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis)
- [SpeechSynthesisUtterance | MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
- [SpeechSynthesis: voiceschanged event | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis/voiceschanged_event)