# JavaScript 30 - Type Ahead 練習

製作關鍵字搜尋，使用者輸入關鍵字，會列出符合的城市名稱。

## 步驟

- 獲取城市資料
- 得到使用者輸入的關鍵字
- 過濾出符合關鍵字的資料
- 將過濾出來的資料顯示在頁面上

## 步驟詳解

- 獲取城市資料

  ```javascript
  // API url
  const endpoint =
  	"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  // 資料初始化
  const cities = [];

  // fetch 資料
  fetch(endpoint)
  	.then(response => response.json())
  	.then(data => cities.push(...data));
  ```

- 得到使用者輸入的關鍵字

  ```javascript
  // 拿到 input elements
  const input = document.querySelector(".search");

  // 在 fetch 資料後 .then 加入監聽事件
  fetch(endpoint)
  	.then(response => response.json())
  	.then(data => cities.push(...data))
  	.then(() => {
  		// 等到資料都 GET 到後再註冊並觸發監聽事件
  		input.addEventListener("change", displayLists);
  		input.addEventListener("keyup", displayLists);
  	});
  ```

- 過濾出符合關鍵字的資料
  ```javascript
  function getMatches(userInput, cities) {
  	return cities.filter(place => {
  		const keyWord = new RegExp(userInput, "gi");
  		return place.city.match(keyWord) || place.state.match(keyWord);
  	});
  }
  ```
- 將過濾出來的資料顯示在頁面上
  ```javascript
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
  ```
