// 選到所有的 input
const inputs = document.querySelectorAll(".controls input");

// 掛上輸入值監聽
inputs.forEach((input) => input.addEventListener("change", styleChanging));

// 掛上操作中的值監聽
inputs.forEach((input) => input.addEventListener("mousemove", styleChanging));

// 變更樣式的功能
function styleChanging() {
  const unit = this.dataset.sizing || "";
  console.log(this.value);
  document.documentElement.style.setProperty(
    `--${this.name}`,
    `${this.value}${unit}`
  );
}
