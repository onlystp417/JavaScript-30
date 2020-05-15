// API url
const endpoint =
	"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

// 拿到 elements
const input = document.querySelector(".search");
const lists = document.querySelector(".suggestions");

// 資料初始化
const cities = [];

// fetch 資料
fetch(endpoint)
	.then(response => response.json())
	.then(data => cities.push(...data))
	.then(() => {
		// 等到資料都 GET 到後再註冊並觸發監聽事件
		input.addEventListener("change", displayLists);
		input.addEventListener("keyup", displayLists);
	});

// 找到符合關鍵字的資料
function getMatches(userInput, cities) {
	return cities.filter(place => {
		const keyWord = new RegExp(userInput, "gi");
		return place.city.match(keyWord) || place.state.match(keyWord);
	});
}

// 將搜尋到的資料渲染在畫面上
function displayLists() {
	const matchArray = getMatches(this.value, cities);
	const matchElement = matchArray
		.map(matchPlace => {
			// 將關鍵字部分 hightlight
			const keyword = new RegExp(this.value, "gi");
			const cityName = matchPlace.city.replace(keyword, `<span class="hl">${this.value}</span>`);
			const stateName = matchPlace.city.replace(keyword, `<span class="hl">${this.value}</span>`);
			// 將過濾出來的項目加進以 HTML 格式回傳
			return `
      <li>
        <span class="place-name">${cityName}, ${stateName}</span>
        <span class="population">${matchPlace.population}</span>
      </li>
    `;
		})
		.join("");
	// 將新建的 element 加進 lists 裡
	lists.innerHTML = matchElement;
}
