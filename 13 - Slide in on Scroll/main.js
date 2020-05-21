// 拜訪到圖片
const sliderImages = document.querySelectorAll(".slide-in");

// 在網頁上掛滾輪監聽，每 20 毫秒再執行 slideIn 函式
window.addEventListener("scroll", debounce(slideIn));

// 每 20 毫秒再執行函式
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

// 圖片滑進來的效果
function slideIn(e) {
	sliderImages.forEach(sliderImage => {
		// 取得圖片一半高度時的位置
		const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
		// 取得圖片底部的位置
		const imageBottom = sliderImage.offsetTop + sliderImage.height;
		// scroll 到圖片一半時
		const isHalfShown = slideInAt > sliderImage.offsetTop;
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
