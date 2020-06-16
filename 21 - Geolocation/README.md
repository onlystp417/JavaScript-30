# JavaScript 30 - Geolocation 練習

實作羅盤功能，並顯示使用者的裝置移動速率。

# 步驟

- 手機連公開網域開啟該頁面
- 取得裝置的方位、移動速度等資訊
- 將方位、移動速度等資訊渲染至頁面

## 步驟詳解

- 手機連公開網域開啟該頁面
  - 用 php 開 local server，並指定 port 號為 3000
    ```shell
    $ php -s localhost:3000
    ```
  - 透過 ngrok 服務模擬公開網域
    ```shell
    $ ngrok http 3000
    ```
    開啟後，用手機連 https 那個網址，這個網址有 ngrok 的憑證，不會因安全性被阻擋。
    ![](https://i.imgur.com/KKVGQsB.png)
- 取得裝置的方位、移動速度等資訊
  ```javascript
  // 產生一個 navigator.geolocation 的實例，透過它實作取得使用者的方位等資訊
  const userLocation = navigator.geolocation;

  // 用 watchPosition 監聽，如果使用者的位置改變，會回傳使用者的方位等資訊
  userLocation.watchPosition(
    // 用 locationData 參數接住
    locationData => {
      // 在 console 印出來確定有接到，也可以看一下它的資料格式
      console.log(locationData);
      // 可以在 coords 屬性中取的 speed（移動速度） 的值
      console.log(locationData.coords.speed);
      // 可以在 coords 屬性中取的 heading（朝向哪個方位） 的角度
      console.log(locationData.coords.heading);
    },
    // watchPosition 的第二個參數可以接 error，可寫可不寫
    err => {
      console.log(err);
    }
  )
  ```
- 將方位、移動速度等資訊渲染至頁面
  ```javascript
  // 取得羅盤方位節點
  const direction = document.querySelector('.arrow');
  // 取得速度顯示的節點
  const speed = document.querySelector('.speed-value');

  navigator.geolocation.watchPosition(
    locationData => {
      // 將速度跟方位值渲染至頁面上
      speed.textContent = (locationData.coords.speed).toFixed(2);
      direction.style.transform = `rotate(${locationData.coords.heading}deg)`;
    },
    err => {
      console.log(err);
    }
  )
  ```

## 參考資料
- [神器ngrok - 《Chris 技術筆記》](https://dwatow.github.io/2017/06-16-ngrok/)
- [Geolocation | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation)
- [Geolocation.watchPosition() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/watchPosition)
- [Navigator | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Navigator)
- [Navigator.geolocation | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Navigator/geolocation)