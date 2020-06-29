// 向語音 API 請求語音接口，透過這個接口來操作語音功能
const msg = new SpeechSynthesisUtterance();

// 初始化語音列表陣列
let voices = [];

// 取得 DOM 節點
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// 把預設的 input 內容放進 msg 物件中
msg.text = document.querySelector('[name="text"]').value;

// 因為語音列表是非同步取得的，等語音列表異步確認後，
// 才觸發 'voiceschanged'，然後執行 populationList（取得語音列表）
speechSynthesis.addEventListener('voiceschanged', populationList);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', readText);
stopButton.addEventListener('click', () => readText(false));

// 在頁面上顯示語音列表的功能
function populationList() {
  // 取得語音列表
  voices = this.getVoices();
  // 把語音列表渲染至下拉選單中
  voicesDropdown.innerHTML = voices
  .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`);
}

// 將選定的語音值放入語音物件中，只要一選定就朗讀文字
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  readText();
}

// 將滑軌的值與 input 文字內容放入語音物件中，只要值一改變，就朗讀文字
function setOption() {
  msg[this.name] = this.value;
  readText();
}

// 朗讀文字的功能，並且只要一處發該功能，就馬上停掉上一個朗讀，再朗讀新的
function readText(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
