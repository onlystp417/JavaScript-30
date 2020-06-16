// 串語音辨識的 API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// 建構一個語音物件
const recognition = new SpeechRecognition();
// 是否回傳過渡值
recognition.interimResults = true;
// 設定語言
recognition.lang = 'zh-tw' || 'en-US';
// 執行收音
recognition.start();

// 製造一個 <p> element
let pTag = document.createElement('p');
// 選取到 words 節點
const words = document.querySelector('.words');
words.appendChild(pTag);

//如果有收到語音，就把接到的語音物件轉成可讀的文字
recognition.addEventListener('result', e => {
  const transcript = [...e.results]
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  // 將文字渲染在頁面上
  pTag.textContent = transcript;

  // 如果收到的語音告一段落，就再新增一個新的 <p> 來接收接下來的語音內容
  if (e.results[0].isFinal) {
    pTag = document.createElement('p');
    words.appendChild(pTag);
  }
});

// 如果收到的語音告一段落，就還是再開始收音
recognition.addEventListener('end', recognition.start);
