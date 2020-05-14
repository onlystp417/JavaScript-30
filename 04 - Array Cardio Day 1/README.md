# JavaScript 30 - Array Cardio 練習

練習 Array method :

- Array.prototype.filter()
- Array.prototype.map()
- Array.prototype.sort()
- Array.prototype.reduce()

```javascript
const inventors = [
  { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
  { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
  { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
  { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
  { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
];
```

### 練習 1. 過濾出 inventors 陣列中，16 世紀出生的發明家

      ```javascript
      const fifteenCenturyInventors = inventors.filter(
        (inventor) => inventor.year >= 1500 && inventor.year < 1600
      );

      console.table(fifteenCenturyInventors);
      ```

### 練習 2. 給出 inventors 陣列中發明家的全名

      ```javascript
      const inventorsName = inventors.map(
        (inventor) => `${inventor.first} ${inventor.last}`
      );
      console.table(inventorsName);
      ```

### 練習 3. 將 inventors 陣列中的發明家，依據出生時間，從最早到最晚排列出來

      ```javascript
      const ageSequence = inventors.sort((a, b) => (a.year > b.year ? -1 : 1));

      console.table(ageSequence);
      ```

### 練習 4. 加總 inventors 陣列中，所有發明家的歲數

      ```javascript
      const totalLiveYears = inventors.reduce((totalYears, inventor) => {
        return totalYears + (inventor.passed - inventor.year);
      }, 0);

      console.log(totalLiveYears);
      ```

### 練習 5. 依年齡排列 inventors 陣列中的發明家順序

      ```javascript
      const liveSequence = inventors.sort((a, b) =>
        a.passed - a.year > b.passed - b.year ? 1 : -1
      );

      console.table(liveSequence);
      ```

### 練習 6. 從[維基百科：Boulevards in Paris](https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris) 中列出巴黎林蔭大道的路名中有 'de' 的

      ```javascript
      const boulevards = Array.from(
        document.querySelectorAll(".mw-category-group a")
      );

      const boulevardWithDE = boulevards
        .map((boulevard) => boulevard.textContent)
        .filter((boulevardText) => boulevardText.includes("de"));

      console.table(boulevardWithDE);
      ```

### 練習 7. 將 people 陣列中的人名依字母順序排列

      ```javascript
      const people = [
        "Beck, Glenn", "Becker, Carl", "Beckett, Samuel", "Beddoes, Mick", "Beecher, Henry", "Beethoven, Ludwig", "Begin, Menachem", "Belloc, Hilaire", "Bellow, Saul", "Benchley, Robert", "Benenson, Peter", "Ben-Gurion, David", "Benjamin, Walter", "Benn, Tony", "Bennington, Chester", "Benson, Leana", "Bent, Silas", "Bentsen, Lloyd", "Berger, Ric", "Bergman, Ingmar", "Berio, Luciano", "Berle, Milton", "Berlin, Irving", "Berne, Eric", "Bernhard, Sandra", "Berra, Yogi", "Berry, Halle", "Berry, Wendell", "Bethea, Erin", "Bevan, Aneurin", "Bevel, Ken", "Biden, Joseph", "Bierce, Ambrose", "Biko, Steve", "Billings, Josh", "Biondo, Frank", "Birrell, Augustine", "Black, Elk", "Blair, Robert", "Blair, Tony", "Blake, William",
      ];

      const lastNameSequence = people.sort((lastOne, nextOne) => {
        const [aLastName, aFirstName] = lastOne.split(", ");
        const [bLastName, bFirstName] = nextOne.split(", ");
        return aLastName > bLastName ? 1 : -1;
      });

      console.table(lastNameSequence);
      ```

### 練習 8. 統計 data 陣列中，每樣交通工具的數量

      ```javascript
      // Sum up the instances of each of these
      const data = ["car", "car", "truck", "truck", "bike", "walk", "car", "van", "bike", "walk", "car", "van", "car", "truck",];

      const statistics = data.reduce((obj, motor) => {
        // 初始化每個 key 值
        if (!obj[motor]) {
          obj[motor] = 0;
        }
        // 每出現一次就累加
        obj[motor]++;
        return obj;
      }, {});

      console.log(statistics);
      ```
