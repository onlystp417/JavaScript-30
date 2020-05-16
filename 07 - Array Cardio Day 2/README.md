# JavaScript 30 - Array Cardio Day2 練習

## 練習操作陣列的方法：

- Array.prototype.some()
- Array.prototype.every()
- Array.prototype.find()
- Array.prototype.findIndex()
- Array.prototype.splice()
- Array.prototype.slice()

## 題目

```javascript
const people = [
	{ name: "Wes", year: 1988 },
	{ name: "Kait", year: 1986 },
	{ name: "Irv", year: 1970 },
	{ name: "Lux", year: 2015 },
];

const comments = [
	{ text: "Love this!", id: 523423 },
	{ text: "Super good", id: 823423 },
	{ text: "You are the best", id: 2039842 },
	{ text: "Ramen is my fav food ever", id: 123523 },
	{ text: "Nice Nice Nice!", id: 542328 },
];
```

- 檢查 people 陣列內是否包含 19 歲以上成年人
  用 `Array.prototype.some()` 逐一檢查陣列是否符合條件，如果有一個符合就會回傳 true。
  ```javascript
  const nowYear = new Date().getFullYear();
  const includeAdult = people.some(people => nowYear - people.year >= 19);
  console.log("Is it include Adult ?", includeAdult);
  ```
- 檢查 people 陣列內是否每位都是 19 歲以上成年人
  用 `Array.prototype.every()` 逐一檢查陣列是否符合條件，如果有全部符合才會回傳 true。
  ```javascript
  const everyoneAdult = people.every(people => nowYear - people.year >= 19);
  console.log("Is everyone Adult ?", everyoneAdult);
  ```
- 找出 ID 為 823423 的發言
  用 `Array.prototype.find()` 逐一檢查陣列是否有符合條件的值，並返回該值。
  ```javascript
  const theOne = comments.find(comment => comment.id === 823423);
  console.log(`ID 823423 comment is "${theOne.text}"`);
  ```
- 刪掉 ID 為 823423 的發言
  1. 用 `Array.prototype.findIndex()` 找到符合條件的 index 值。
  2. 再用 `.splice()` 刪掉留言。
  ```javascript
  const theIndex = comments.findIndex(comment => comment.id === 823423);
  // 刪掉留言，會改變原本的陣列
  comments.splice(theIndex, 1);
  console.log("ID 823423 comment is deleted, here is the new comments:");
  console.table(comments);
  ```
  3. 或是也可以用 `.slice()` 選要留下來的發言，再用展開運算子 `...` 放進新陣列中：
  ```javascript
  const newComments = [...comments.slice(0, theIndex), ...comments.slice(theIndex + 1)];
  console.table(newComments);
  ```
