// 取得 navbar 節點
const navbar = document.querySelector('#main');

// 取得 navbar 上緣距離視口的高度
const navbarTopSpace = navbar.offsetTop;
// 取得 navbar 的元素盒高度
const navbarHeight = navbar.offsetHeight;

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