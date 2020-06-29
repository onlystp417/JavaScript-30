// 取得 DOM 節點
const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

// 試試看第三個參數 useCapture 差異在哪
divs.forEach(div => div.addEventListener('click', printClass, {
  capture: false,
  once: false
}));

// 事件冒泡會一直往外，甚至是 body、html、browser...
document.body.addEventListener('click', printClass);

// 印出 class 名稱
function printClass(e) {
  // 如果是 this，會印出事件冒泡的每一個元素
  console.log(this.classList.value);
  // 如果是 e.target，會印出按下的元素，不會印出冒泡的每一個元素
  console.log(e.target.classList.value);
}

// 試試看第三個參數來設定單一綁定事件
button.addEventListener('click', () => {
  console.log('click only once');
}, {
  once: true
})