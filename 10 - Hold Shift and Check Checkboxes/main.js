const items = document.querySelectorAll(".item");

items.forEach((item, index) => item.addEventListener("click", checkFirstItem));
// items.forEach((item, index) => item.addEventListener("click", itemsSequently));

function checkFirstItem(index) {
	const input = this.querySelector("input");
	input.checked = true;
	console.log(this);
}

// function itemsSequently() {}
