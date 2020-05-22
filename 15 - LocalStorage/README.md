# JavaScript 30 - LocalStorage 練習

## 步驟

- 拜訪所有 DOM 節點
- 存取使用者輸入的餐點，並存在 localStorage
- 將所有的餐點項目渲染到頁面上
- 勾選已完成項目的功能
- 刪除已完成項目的功能
- 刪除全部項目的功能
- 反轉勾選項目的功能

## 步驟詳解

- 取得所有 DOM 節點
  ```javascript
  // 取得 DOM 節點
  const addItems = document.querySelector('.add-items'); // form 表單
  const itemsList = document.querySelector('.plates'); // 清單
  const delFinished = document.querySelector('#deleteFinished'); // 刪除完成項目鍵
  const delAll = document.querySelector('#deleteAll'); // 刪除全部項目鍵
  const reverse = document.querySelector('#reverse'); // 反轉勾選鍵
  ```
- 存取使用者輸入的餐點，並存在 localStorage

  ```javascript
  // 在表單上掛監聽，如果使用者有 submit 輸入，就把這個輸入加進 list 裡面
  addItems.addEventListener('submit', addItem);

  // 宣告點餐的項目，如果暫存中有資料就放進 items；如果沒有，就初始化為空陣列
  let mealItems = JSON.parse(localStorage.getItem('items')) || [];

  // 把 item 加進 lists 裡面的功能
  function addItem(e) {
    // 防止 submit event 的頁面跳轉預設
    e.preventDefault();
    // 取得使用者輸入的字
    const textInput = this.querySelector('[name = "item"]').value;
    // 把使用者輸入的字包成一個單一物件，並帶有是否出餐的 key 值
    const mealItem = {
      text: textInput,
      done: false
    };
    // 把每個輸入的物件放進 items 陣列中
    mealItems.push(mealItem);
    // 把點餐項目放進 HTML 內，才能渲染在頁面上
    populateList(mealItems, itemsList);
    // 創造一個 localStorage 名叫 items，把資料文字化然後存進去
    localStorage.setItem('items', JSON.stringify(mealItems));
    // 初始化表單
    this.reset();
  }
  ```

- 將所有的餐點項目渲染到頁面上

  ```javascript
  // 頁面 loading 進來時就先把有的 list 渲染到頁面上
  populateList(mealItems, itemsList);

  // 把 list 放進 HTML 裡的功能
  function populateList(plates = [], plateList) {
    plateList.innerHTML = plates
      .map((plate, i) => {
        return `<li> <input type="checkbox" data-index=${i} id="item${i}" ${
          plate.done ? 'checked' : ''
        }/> <label for="item${i}">${plate.text}</label> </li>`;
      })
      .join('');
  }
  ```

- 勾選已完成項目的功能

  ```javascript
  // 在 lists 掛上監聽，如果點擊 item 就切換 checkbox 樣式
  itemsList.addEventListener('click', toggleDone);

  // 勾選完成項目功能
  function toggleDone(e) {
    // 點選餐點時，會同時點到 <label> 跟 <input>，把 <label> 擋掉
    if (!e.target.matches('input')) return;
    // 取得當前的點擊目標（經過過濾只會有 input）
    const element = e.target;
    // 取得 input element 的自定義 index 值
    const index = element.dataset.index;
    // 若被點擊，done 值反轉
    mealItems[index].done = !mealItems[index].done;
    // 存進 localStorage
    localStorage.setItem('items', JSON.stringify(mealItems));
  }
  ```

- 刪除已完成項目的功能

  ```javascript
  // 在 delFinished 掛上監聽，如果點擊就刪除已完成項目
  delFinished.addEventListener('click', deleteFinished);

  // 刪除完成項目的功能
  function deleteFinished() {
    // 過濾掉已經完成的項目（done 為 true 的）
    mealItems = mealItems.filter(item => !item.done);
    // 存進 localStorage 並將新的清單渲染在頁面上
    localStorage.setItem('items', JSON.stringify(mealItems));
    populateList(mealItems, itemsList);
  }
  ```

- 刪除全部項目的功能

  ```javascript
  // 在 delAll 掛上監聽，如果點擊就刪除全部項目
  delAll.addEventListener('click', deleteAll);

  // 刪除所有項目的功能
  function deleteAll() {
    // 將 mealItems 清空
    mealItems = [];
    // 存進 localStorage 並將新的清單渲染在頁面上
    localStorage.setItem('items', JSON.stringify(mealItems));
    populateList(mealItems, itemsList);
  }
  ```

- 反轉勾選項目的功能

  ```javascript
  // 在 reverse 掛上監聽，如果點擊就反轉 checkbox
  reverse.addEventListener('click', reverseCheck);

  // 反轉勾選的功能
  function reverseCheck() {
    // 遍歷 mealItems 內的項目，反轉 done 的值
    mealItems = mealItems.map(item => {
      item.done = !item.done;
      return item;
    });
    // 存進 localStorage 並將新的清單渲染在頁面上
    localStorage.setItem('items', JSON.stringify(mealItems));
    populateList(mealItems, itemsList);
  }
  ```
