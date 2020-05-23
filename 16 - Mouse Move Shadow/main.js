// 取得 DOM 節點
const moveScope = document.querySelector('.moveScope'); // 移動範圍
const text = moveScope.querySelector('h1'); // 移動目標

// 在移動範圍掛上滑鼠監聽，滑鼠移動就觸發 fantacyShadow 功能
moveScope.addEventListener('mousemove', fantacyShadow);

function fantacyShadow(e) {
  // 取得移動範圍的長寬
  const scopeWidth = moveScope.offsetWidth;
  const scopeHeight = moveScope.offsetHeight;

  // 取得滑鼠移動座標
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;

  // 讓滑鼠位移座標得以延續（排除滑在 h1 element 上會歸零計算的可能）
  if (this !== e.target) {
    mouseX += e.target.offsetLeft;
    mouseY += e.target.offsetTop;
  }

  // 做出影子效果
  makingShadow(scopeWidth, scopeHeight, mouseX, mouseY);
}

// 影子效果功能
function makingShadow(scopeWidth, scopeHeight, x, y) {
  // 宣告移動單位
  const move = 200;

  // 宣告移動座標值 （總移動座標值 - 中心座標值）
  const xMove = Math.round((x / scopeWidth) * move) - move / 2;
  const yMove = Math.round((y / scopeHeight) * move) - move / 2;

  // 做出上下左右的位移影子
  text.style.textShadow = `
    ${xMove}px ${yMove}px #7878aa,
    ${-xMove}px ${yMove}px #aa8787,
    ${yMove}px ${-xMove}px #04295a,
    ${-yMove}px ${xMove}px #ca2590
  `;
}
