const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const shotBtn = document.querySelector('.shot-btn');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

getVideo();

// 取得用戶的攝影機影像
function getVideo() {
  // 取得用戶的攝影機影像，會回傳一個 promise 物件
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    // 若取得成功
    .then(localMediaStream => {
      // 將該影像資料做為 video element 的來源
      video.srcObject = localMediaStream;
      // 播放 video
      video.play();
    })
    // 若取得失敗，印出失敗訊息
    .catch(error => {
      console.log('Unsuccessful...', error);
    });
}

// 在 video 掛監聽，如果可以播放了，就將影像渲染在畫布上
video.addEventListener('canplay', paint2Canvas);

// 將影像渲染到畫布上
function paint2Canvas() {
  // 讓 canvas 的長寬相等於 video 的長寬
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // 每 16 毫秒執行
  setInterval(() => {
    // 把影像渲染在畫布上
    ctx.drawImage(video, 0, 0, width, height);
    // 取得當下畫面的像素數據
    let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels);
    // 改變數據以達到紅色效果，並把數據放回畫布影像上
    pixels = filterColor(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

// 在拍照按鈕上掛監聽，按就執行拍照功能
shotBtn.addEventListener('click', takePhoto);

// 拍照功能
function takePhoto() {
  // 拍照的聲音
  snap.currentTime = 0;
  snap.play();

  // 取得照片檔並渲染在 HTML 可供下載
  const data = canvas.toDataURL('image/png');

  // 新增一個 <a> element，設定 url 為拍到的照片，並且是供下載用的
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'awesome');

  // 將照片放進 <a> ，並放入相簿內，渲染在頁面上
  link.innerHTML = `<img src=${data} alt='photo'>`;
  strip.insertBefore(link, strip.firstChild);
}

// 把影像弄成紅色的功能
function redEffect(pixels) {
  // 遍歷每組 rgba 並改變它們的值
  for (let i = 0; i < pixels.data.length; i += 4) {
    // 紅色的值增加
    pixels.data[i + 0] += 100;
    // 綠色與藍色的值降低
    pixels.data[i + 1] -= 30;
    pixels.data[i + 2] *= 0.5;
  }
  return pixels;
}

// 將 rgb 分離顯示
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 100] = pixels.data[i + 0]; // red 偏移
    pixels.data[i + 500] = pixels.data[i + 1]; // green 偏移
    pixels.data[i - 550] = pixels.data[i + 2]; // blue 偏移
  }
  return pixels;
}

// 顏色過濾操作功能
function filterColor(pixels) {
  // 宣告一個可以接住 input 值的空物件
  const levels = {};
  // 讀取到 input 的值並放入 levels 物件內
  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value;
  });

  // 遍歷影像資料取得所有的 rgba 值
  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    // 區間內的顏色變透明（不顯示）
    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}
