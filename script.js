const container = document.querySelector(".extension-grid");
const inputBtn = document.querySelector(".checkbox");
const filterBtn = document.querySelectorAll("button");

document.addEventListener("DOMContentLoaded", () => {
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

        div.append(head);
        head.append(img);
        head.append(text);
        actions.append(btn);
        actions.append(checkbox);
        div.append(actions);
        div.className = `item ${extension.isActive}`;
        head.className = "head";

        container.insertAdjacentElement("beforeend", div);
        count++;
        const toggle = document.querySelectorAll(".checkbox");

        toggle.forEach((cb) => {
          cb.addEventListener("change", (ce) => {
            if (!cb.checked) {
              console.log(ce.target.parentNode);
              div.classList.remove("active");
              ce.target.parentNode.classList.remove("active");
              div.classList.add("inActive");
            } else {
              div.classList.add("active");
              ce.target.parentNode.classList.add("active");
              div.classList.remove("inActive");
            }
            if (cb.classList.contains("active")) {
              cb.checked === true;
            }
          });
        });
      })
    );
});

filterBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBtn.forEach((b) => {
      b.style.background = "var(--Neutral-0)";
      b.style.color = "var(--Neutral-900)";
    });
    e.target.style.background = "var(--Red-700)";
    e.target.style.color = "var(--Neutral-0)";
    console.log(btn.style.background);

    const item = document.querySelectorAll(".item");

    if (e.target.id === "active") {
      item.forEach((i) => {
        if (!i.classList.contains("true")) {
          i.style.display = "none";
        } else {
          i.style.display = "grid";
        }
      });
    } else if (e.target.id === "inactive") {
      item.forEach((i) => {
        if (i.classList.contains("true")) {
          i.style.display = "none";
        } else {
          i.style.display = "grid";
        }
      });
    } else {
      item.forEach((i) => {
        if (i.style.display === "none") {
          i.style.display = "grid";
        }
      });
    }
  });
});
