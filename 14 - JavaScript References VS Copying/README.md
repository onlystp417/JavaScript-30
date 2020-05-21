# JavaScript 30 - JS Reference VS Copy 練習

練習複製 array 或 object，而不是共享同一個 reference。

## 詳解

### 先從基準值來看

當 a 為基準值，並用來賦值給 b，兩個並非共用同一個 reference，所以更動 a，b 不會被更動到。

```javascript
var a = 1;
var b = a;
console.log(a, b); // 1, 1
a = 2;
console.log(a, b); // 2, 1
```

### array 跟 object

可是 array 跟 object 不能如法炮製，因為會共享同一個 reference。
舉例來說：

```javascript
// Let's say we have an array
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

// and we want to make a copy of it.
const copyPlayers = players;
// You might think we can just do something like this:
// however what happens when we update that array?
copyPlayers.push("Jinwen");
// now here is the problem!
// oh no - we have edited the original array too!
console.log(copyPlayers); // ["Wes", "Sarah", "Ryan", "Poppy", "Jinwen"]
console.log(players); // ["Wes", "Sarah", "Ryan", "Poppy", "Jinwen"]
// 復原陣列內的值
copyPlayers.pop();
```

### 要複製一個不會更動到原 array 的新 array，有下列方法：

- `.splice()`
  ```javascript
  const copyPlayers1 = players.slice();
  copyPlayers1[0] = "Mazzy";
  console.log(copyPlayers1); // ["Mazzy", "Sarah", "Ryan", "Poppy"]
  console.log(players); // ["Wes", "Sarah", "Ryan", "Poppy"]
  ```
- `.concat()`

  ```javascript
  const copyPlayers2 = [].concat(players);
  copyPlayers2.push("Jinwen");
  console.log(copyPlayers2); // ["Wes", "Sarah", "Ryan", "Poppy", "Jinwen"]
  console.log(players); // ["Wes", "Sarah", "Ryan", "Poppy"]
  ```

- 展開運算子 `...`

  ```javascript
  const copyPlayers3 = [...players];
  copyPlayers3.pop();
  console.log(copyPlayers3); // ["Wes", "Sarah", "Ryan"]
  console.log(players); // ["Wes", "Sarah", "Ryan", "Poppy"]
  ```

- `Array.from`

  ```javascript
  const copyPlayers4 = Array.from(players);
  copyPlayers4.splice(1);
  console.log(copyPlayers4); // ["Wes"]
  console.log(players); // ["Wes", "Sarah", "Ryan", "Poppy"]
  ```

### 要複製一個不會更動到原 object 的新 object，有下列方法：

#### 只複製一層（shallow copy）

- `Object.assign()`

  ```javascript
  const copyPerson1 = Object.assign({}, person, { name: "Jinwen", age: 21 });
  console.log(copyPerson1); // {camp: 'Front-end', name: "Jinwen", age: 21}
  console.log(person); // {camp: 'Front-end', name: "Wes Bos", age: 80}
  ```

- 展開運算子 `...`

  ```javascript
  const copyPerson2 = { ...person }; // this work now
  copyPerson2.hobies = "swimming";
  console.log(copyPerson2); // {camp: "Front-end", name: "Wes Bos", age: 80, hobies: "swimming"}
  console.log(person); // {camp: 'Front-end', name: "Wes Bos", age: 80}
  ```

  > 可是如果要用上列方法複製不只一層的 object，無法兼顧到更深層的複製：

  ```javascript
  const member = {
  	name: "Wes Bos",
  	age: 80,
  	social: {
  		facebook: "@wesbos",
  		instagram: "@wesbos01",
  	},
  };

  const copyMember1 = { ...member };
  copyMember1.social.facebook = "@coolperson";
  console.log(copyMember1.social); // {facebook: "@coolperson", instagram: "@wesbos01"}
  console.log(member.social); // {facebook: "@coolperson", instagram: "@wesbos01"}
  ```

#### 深層複製（deep copy）

- 先用 `JSON.strinify()` 轉成文字再用`JSON.parse()` 轉回來
  ```javascript
  const copyMember2 = JSON.parse(JSON.stringify(member));
  copyMember2.social.facebook = "@coolperson";
  console.log(copyMember1.social); // {facebook: "@coolperson", instagram: "@wesbos01"}
  console.log(member.social); // {facebook: "@wesbos", instagram: "@wesbos01"}
  ```
