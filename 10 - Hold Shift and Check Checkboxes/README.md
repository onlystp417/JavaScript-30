# JavaScript 30 - Hold Shift and Check Checkboxes 練習

實現按住 shift 勾選，會勾選在中間的所有 checkbox items。

## 步驟

- 監聽所有的 checkbox
- 記錄第一個勾選到的 checkbox
- 按住 shift 勾選第二個 checkbox，會勾選到中間所有的 checkboxs

## 步驟詳解

- 監聽所有的 checkbox

  ```javascript
  // 選到所有的 checkboxs
  const checkboxs = document.querySelectorAll("input");

  // 為每個 checkbox 掛上滑鼠點擊監聽
  checkboxs.forEach(checkbox => checkbox.addEventListener("click", checkItems));
  ```

- 記錄第一個勾選到的 checkbox

  ```javascript
  let firstChecked = null;

  function checkItems(e) {
  	// 留著放 shift + click 功能

  	// 將第一個勾選的 checkbox 放函式最後，以免被第二個 shift + click 蓋掉
  	firstChecked = this;
  }
  ```

- 按住 shift 勾選第二個 checkbox，會勾選到中間所有的 checkboxs
  ```javascript
  function checkItems(e) {
  	// 聲明一個是否在這兩個 checkbox 中間（包含兩個 checkbox）的區域變數為 false
  	let inBetween = false;
  	// 如果 shift + click，就開始遍歷每個 checkbox
  	if (e.shiftKey && this.checked) {
  		checkboxs.forEach(checkbox => {
  			// 符合第二個 shift + click 的 checkbox 或是 符合第一個 checkbox
  			if (checkbox === this || checkbox === firstChecked) {
  				// 如果符合其中一個就會反轉為 true
  				// 所以如果遍歷到第二次反轉，就會再轉回 false
  				inBetween = !inBetween;
  			}
  			// 若 inBetween 為真，checkbox 就勾選
  			if (inBetween) {
  				checkbox.checked = true;
  			}
  		});
  	}
  	// 將第一個勾選的 checkbox 放函式最後，以免被第二個 shift + click 蓋掉
  	firstChecked = this;
  }
  ```
