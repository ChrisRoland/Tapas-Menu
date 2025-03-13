const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".dishes");
const checkAllBtn = document.querySelector(".check-all");
const uncheckAllBtn = document.querySelector(".uncheck-all");
const deleteAllBtn = document.querySelector(".delete-all");

let items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
  buttonsVisibility();
  this.reset();
}

function populateList(dishes = [], dishesList) {
  dishesList.innerHTML = dishes.length
    ? dishes
        .map(
          (dish, i) => `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
            dish.done ? "checked" : ""
          } />
        <label for="item${i}">${dish.text}</label>
      </li>
    `
        )
        .join("")
    : "<li>No Tapas added yet!</li>";

  buttonsVisibility();
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function buttonsVisibility() {
  const hasItems = items.length > 0;
  [checkAllBtn, uncheckAllBtn, deleteAllBtn].forEach((btn) => {
    btn.style.display = hasItems ? "inline-block" : "none";
  });
}

function checkAll() {
  items.forEach((item) => (item.done = true));
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function uncheckAll() {
  items.forEach((item) => (item.done = false));
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function deleteAll() {
  items = [];
  localStorage.removeItem("items");
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
checkAllBtn.addEventListener("click", checkAll);
uncheckAllBtn.addEventListener("click", uncheckAll);
deleteAllBtn.addEventListener("click", deleteAll);

populateList(items, itemsList);
buttonsVisibility();
