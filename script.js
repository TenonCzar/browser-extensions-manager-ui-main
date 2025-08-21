const container = document.querySelector(".extension-grid");
const inputBtn = document.querySelector(".checkbox");
const filterBtn = document.querySelectorAll(".btn");
const entireDoc = document.querySelectorAll("*");

const themeBtn = document.querySelector(".switch");
let theme = "light";
document.addEventListener("DOMContentLoaded", () => {
  checkTheme();
  fetchItems();
  filterItems();
});
// Filtering

// Switch Theme

themeBtn.addEventListener("click", () => {
  // console.log(themeBtn.style);
  switchTheme();
});

function fetchItems() {
  let count = 1;
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) =>
      data.forEach((extension) => {
        const div = document.createElement("div");
        const head = document.createElement("div");
        const text = document.createElement("div");
        const actions = document.createElement("div");
        const btn = document.createElement("button");
        const img = document.createElement("img");
        const checkbox = document.createElement("label");
        const checkboxId = `counter${count}`;
        img.src = extension.logo;
        text.innerHTML = `<h3 class="name">${extension.name}</h3>${extension.description}`;
        checkbox.innerHTML = `<input type="checkbox" name="mode" id="${checkboxId}" class="checkbox">`;
        checkbox.htmlFor = `${checkboxId}`;
        checkbox.className = "mode-toggle";
        actions.className = "actions";
        btn.innerText = "Remove";
        btn.className = "remove";
        text.className = "desc";

        div.append(head);
        head.append(img);
        head.append(text);
        actions.append(btn);
        actions.append(checkbox);
        div.append(actions);
        div.className = `item ${extension.isActive}`;
        head.className = "head";
        function checkTheme() {
          if (document.body.classList.contains("dark")) {
            div.classList.add("dark");
            div.style.color = "#fff";
          } else {
            div.classList.remove("dark");
            localStorage.clear();
            localStorage.setItem("theme", (theme = "light"));
          }
        }

        themeBtn.addEventListener("click", () => {
          checkTheme();
        });

        container.insertAdjacentElement("beforeend", div);
        count++;

        const allItems = container.querySelectorAll(".item");
        allItems.forEach((item) => {
          const cb = item.querySelector(".checkbox");
          if (item.classList.contains("true")) {
            cb.checked = true;
          }
        });

        btn.addEventListener("click", (item) => {
          const parentItem = item.target.closest(".item");
          lo(parentItem);
        });
        function lo(kini) {
          div.remove();
        }

        checkTheme();
        const toggle = document.querySelectorAll(".checkbox");
        toggle.forEach((cb) => {
          cb.addEventListener("change", (ce) => {
            const parentItem = ce.target.closest(".item");
            if (!cb.checked) {
              parentItem.classList.remove(`${extension.isActive}`);
              parentItem.classList.add("false");
            } else {
              parentItem.classList.remove(`${extension.isActive}`);
              parentItem.classList.toggle("true");
            }
          });
        });
      })
    );
}

function filterItems() {
  filterBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterBtn.forEach((dark) => {
        if (dark.classList.contains("dark")) {
          dark.style.background = "var(--Neutral-700)";
          dark.style.color = "var(--Neutral-0)";
        } else {
          dark.style.background = "var(--Neutral-0)";
          dark.style.color = "var(--Neutral-900)";
        }
      });
      filterBtn.forEach((b) => {
        if (b.classList.contains("dark")) {
          b.style.background = "var(--Neutral-700)";
          b.style.color = "var(--Neutral-0)";
        } else {
          b.style.background = "var(--Neutral-0)";
          b.style.color = "var(--Neutral-900)";
        }
      });
      e.target.style.background = "var(--Red-700)";
      e.target.style.color = "var(--Neutral-0)";
      console.log(btn.style.background);

      const item = document.querySelectorAll(".item");
      item.forEach((i) => {
        if (e.target.id === "active") {
          item.forEach((i) => {
            if (!i.classList.contains("true")) {
              i.style.display = "none";
            } else {
              i.style.display = "grid";
            }
          });
        } else if (e.target.id === "inactive") {
          if (i.classList.contains("true")) {
            i.style.display = "none";
          } else {
            i.style.display = "grid";
          }
        } else {
          if (i.style.display === "none") {
            i.style.display = "grid";
          }
        }
      });
    });
  });
}

function switchTheme() {
  entireDoc.forEach((el) => {
    el.classList.toggle("dark");
    // console.log(el);
  });
  if (document.body.classList.contains("dark")) {
    themeBtn.firstChild.src = "assets/images/icon-sun.svg";
    localStorage.clear();
    localStorage.setItem("theme", (theme = "dark"));
  } else {
    themeBtn.firstChild.src = "assets/images/icon-moon.svg";
  }
}

function checkTheme() {
  console.log(document.querySelectorAll(".item"));
  if (localStorage.getItem("theme") === "dark") {
    switchTheme();
  } else {
    localStorage.clear();
    localStorage.setItem("theme", (theme = "light"));
  }
}
