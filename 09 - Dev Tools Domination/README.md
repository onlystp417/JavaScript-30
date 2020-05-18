# JavaScript 30 - Dev Tools Domination 練習

1. 在開發者工具看相應的 JavaScript 程式碼。
2. 練習 BOM 物件 console 的方法。

## 練習項目

1. 在開發者工具看相應的 JavaScript 程式碼。
   打開開發者工具，查看 element，在想要查看的元素上按滑鼠右鍵，選擇 Break on -> attribute modification。
   ![](https://i.imgur.com/SN0PT71.png)
   接著滑鼠點按頁面上的 \<p> 元素。
   ![](https://i.imgur.com/1BgSXnm.png)
   開發者工具會開啟 debug 模式，並標出元素對應的 JavaScript 程式碼。
   ![](https://i.imgur.com/PI8szGh.png)

2. 練習 BOM 物件 console 的方法。

- Regular 常見的 `.log()` 用法：

  ```javascript
  console.log("Hello World!");
  ```

- Interpolated 插入訊息：

  ```javascript
  const name = "Jinwen";
  console.log("Hi, my name is %s ~~", name);
  ```

- Styled 操作樣式：

  ```javascript
  console.log(
  	"%c This is huge string!",
  	"font-size: 80px; color: pink; text-shadow: 15px 15px 5px purple"
  );
  ```

- warning 警告訊息：

  ```javascript
  console.warn("This is a warning!");
  ```

- Error 錯誤訊息：

  ```javascript
  console.error("This is an error!");
  ```

- Info 資訊：
  ````javascript
  console.info("Jinwen is a beauty~~");
  // In Firefox(but not in chrome), a small "i" icon is displayed next to these items in the Web Console's log.```
  ````
- Testing

  ```javascript
  const booleanValue = false;
  console.assert(booleanValue, "The value is false.");
  ```

- clearing 清除 console 訊息：

  ```javascript
  console.clear();
  ```

- Viewing DOM Elements 將元素作為物件回傳：

  ```javascript
  const p = document.querySelector("p");
  console.log(p);
  console.dir(p);
  ```

- Grouping together 將訊息群組化：

  ```javascript
  dogs.forEach(dog => {
  	console.groupCollapsed(`${dog.name}`);
  	console.log(`Dog name is ${dog.name}`);
  	console.log(`Dog age is ${dog.age} year-old.`);
  	console.log(`Dog age is ${dog.age * 7} dog-year-old.`);
  	console.groupEnd(`${dog.name}`);
  });
  ```

- counting 計算訊息出現次數：

  ```javascript
  console.count("Jinwen"); // 1
  console.count("GenBai"); // 1
  console.count("Jinwen"); // 2
  console.count("Jinwen"); // 3
  console.count("GenBai"); // 2
  console.count("GenBai"); // 3
  console.count("GenBai"); // 4
  console.count("Jinwen"); // 4
  console.count("Jinwen"); // 5
  console.count("GenBai"); // 5
  console.count("Jinwen"); // 6
  console.count("GenBai"); // 6
  console.count("GenBai"); // 7
  ```

- timing 計算程式碼執行時間：
  ```javascript
  function latelyDo() {
  	console.time("latelyDo");
  	window.setTimeout(() => console.timeEnd("latelyDo"), 2000);
  }
  latelyDo();
  ```
