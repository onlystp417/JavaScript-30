// 在網頁上掛滾輪監聽，每 20 毫秒再執行 slideIn 函式
window.addEventListener("scroll", debounce(slideIn));

// 緩 20 毫秒再執行函式
function debounce(func, wait = 20, immediate = true) {
	// 宣告時間到的變數
	var timeout;
	return function () {
		var context = this; // window
		var args = arguments; // scroll events

		// 滑動中會每 20 毫秒清空 timeout 才能執行；停下來時，也是每 20 毫秒執行
		// 等一下函式
		var later = function () {
			// 定義時間到為空值
			timeout = null;
			// 如果不是立即的(不滾動時)，就執行 slideIn，並指定全域 window 給它（相同環境）
			if (!immediate) func.apply(context, args);
		};
		// 宣告現在就執行的條件
		var callNow = immediate && !timeout;
		// 初始 timeout
		clearTimeout(timeout);
		// 定義 timeout 的延遲效果（緩 20 毫秒就執行等一下函式）
		timeout = setTimeout(later, wait);
		// 如果現在就執行的條件為真，就執行 slideIn，並指定全域 window 給它（相同環境）
		if (callNow) func.apply(context, args);
	};
}

// 拜訪到圖片
const sliderImages = document.querySelectorAll(".slide-in");

// 圖片滑進來的效果
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
