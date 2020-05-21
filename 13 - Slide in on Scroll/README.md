# JavaScript 30 - Slide in on Scroll 練習

實現圖片視差滾動效果。

## 步驟

- 在網頁上掛滾輪監聽
- 為滾輪監聽事件緩處理
- 拜訪到每個圖片節點
- 取得圖片一半的位置
- 取得圖片底部的位置
- 設定以上兩個條件成立時引發圖片的滾動效果

## 步驟詳解

- 在網頁上掛滾輪監聽

  ```javascript
  // 在網頁上掛滾輪監聽，當滾輪滾動就執行 slideIn 函式
  window.addEventListener("scroll", slideIn);
  ```

- 為滾輪監聽事件緩處理

  ```javascript
  // 在網頁上掛滾輪監聽，緩 20 毫秒再執行 slideIn 函式
  window.addEventListener("scroll", debounce(slideIn));

  // 緩 20 毫秒再執行函式
  function debounce(func, wait = 20, immediate = true) {
  	var timeout;
  	return function () {
  		var context = this,
  			args = arguments;
  		var later = function () {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  }
  ```

- 拜訪到每個圖片節點

  ```javascript
  // 拜訪到圖片
  const sliderImages = document.querySelectorAll(".slide-in");
  ```

* 聲明 scroll 到圖片一半時的條件

  ```javascript
  function slideIn(e) {
  	sliderImages.forEach(sliderImage => {
  		// 取得圖片一半高度時的位置
  		const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
  		// scroll 到圖片一半時
  		const isHalfShown = slideInAt > sliderImage.offsetTop;
  	});
  }
  ```

* 聲明未 scroll 超過圖片底部的條件

  ```javascript
  function slideIn(e) {
  	sliderImages.forEach(sliderImage => {
  		// 取得圖片一半高度時的位置
  		const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
  		// scroll 到圖片一半時
  		const isHalfShown = slideInAt > sliderImage.offsetTop;
  		// 取得圖片底部的位置
  		const imageBottom = sliderImage.offsetTop + sliderImage.height;
  		// 未 scroll 過圖片的區域
  		const isNotScrollPast = window.scrollY < imageBottom;
  	});
  }
  ```

* 設定以上兩個條件成立時引發圖片的滾動效果

  ```javascript
  function slideIn(e) {
  	sliderImages.forEach(sliderImage => {
  		// 取得圖片一半高度時的位置
  		const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
  		// scroll 到圖片一半時
  		const isHalfShown = slideInAt > sliderImage.offsetTop;
  		// 取得圖片底部的位置
  		const imageBottom = sliderImage.offsetTop + sliderImage.height;
  		// 未 scroll 過圖片的區域
  		const isNotScrollPast = window.scrollY < imageBottom;
  		// scroll 到圖片一半，且未 scroll 過圖片的區域，就執行圖片滑進來的效果
  		if (isHalfShown && isNotScrollPast) {
  			sliderImage.classList.add("active");
  		} else {
  			sliderImage.classList.remove("active");
  		}
  	});
  }
  ```