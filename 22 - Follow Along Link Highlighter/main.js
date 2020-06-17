// 取得節點、新增 highlight 元素，並綁定樣式
const targets = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
// 將 highlight 元素放在 body 層
document.body.appendChild(highlight);

// 在每個 target 上綁上滑鼠 mouseenter 事件，一觸發就執行 highlightTarget
targets.forEach(target => 
  target.addEventListener('mouseenter', highlightTarget)
);

// 幫單字畫重點的功能
function highlightTarget() {
  // 取得當前 hover 到的元素的座標資訊
  const linkCoords = this.getBoundingClientRect();
  // 自己定義座標值
  // 1. width 跟 height 比元素稍寬一點
  // 2. top 跟 left 置中，並且要包含 scroll 數值
  const coords = {
    width: linkCoords.width + 8,
    height: linkCoords.height + 8,
    top: linkCoords.top + window.scrollY - 4,
    left: linkCoords.left + window.scrollX - 4
  };
  // 將自定義的座標渲染為 hightlight 樣式
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}