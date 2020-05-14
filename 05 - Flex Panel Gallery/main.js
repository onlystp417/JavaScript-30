const panels = document.querySelectorAll(".panel");

// 當點擊 panel 區塊時，觸發 toggleOpen 動畫
panels.forEach((panel) => panel.addEventListener("click", toggleOpen));

// 當 toogleOpen 動畫跑完當下，觸發 toggleOpenActive 動畫
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleOpenActive)
);

// 區塊撐開字放大的動畫
function toggleOpen() {
  this.classList.toggle("open");
}

// 上下標題滑進來的動畫
function toggleOpenActive(e) {
  // 當 open 動畫跑完，該元素有 flex-grow 這個 CSS 屬性時，才加入 open-active class
  if (e.propertyName.includes("flex-grow")) {
    this.classList.toggle("open-active");
  }
}
