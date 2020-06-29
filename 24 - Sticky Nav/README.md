# JavaScript 30 - Sticky Nav 練習

navbar 動畫效果。

# 步驟

- 取得 navbar 節點
- 取得 navbar 高度
- navbar sticky 及 logo 滑出效果

## 步驟詳解

- 取得 navbar 節點
  ```javascript
  const navbar = document.querySelector('#main');
  ```
- 取得 navbar 高度與相對視口距離
  ```javascript
  // 取得 navbar 上緣距離視口的高度
  const navbarTopSpace = navbar.offsetTop;
  // 取得 navbar 的元素盒高度
  const navbarHeight = navbar.offsetHeight;
  ```
- navbar sticky 及 logo 滑出效果
  這邊的訣竅在於，把 class 加在 body（父元素）上，而不是加在 navbar 跟 logo 上，再利用選擇器來觸發特定條件下的 navbar 跟 logo 樣式，就可以節省 class 的使用，也方便統一用單一的父層 class 管理。
  ```javascript
  // 在視窗上綁定 scroll 事件，只要一觸發就執行 navFixed
  window.addEventListener('scroll', navFixed);

  // 讓 navbar 在特定條件下黏再視口上緣的功能
  function navFixed() {
    // 如果 scroll 的高度大於等於 navbarTopSpace，就讓 navbar 固定在視口上緣
    // 因為 navbar 的 position 脫離 normal flow，所以要把它高度加回來，才不會造成畫面跳動
    if(window.scrollY >= navbarTopSpace) {
      document.body.classList.add('navbar-effects');
      document.body.style.paddingTop = navbarHeight + 'px';
    } else {
      // 如果不符合條件，就回復初始狀態
      document.body.classList.remove('navbar-effects');
      document.body.style.paddingTop = 0 + 'px';
    }
  }
  ```
  ```css
  /* nav fixed */
  .navbar-effects nav {
    position: fixed;
  }

  /* logo show */
  .navbar-effects li.logo {
    max-width: 250px;
  }
  ```

## 參考資料
