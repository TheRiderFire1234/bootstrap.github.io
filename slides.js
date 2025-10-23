const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pager = document.getElementById("pager");

const total = 8;
let perPage = window.innerWidth <= 600 ? 1 : 3;
let current = 0;

function renderPager() {
  pager.innerHTML = "";
  const totalPages = Math.ceil(total / perPage);
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === current ? " active" : "");
    dot.addEventListener("click", () => {
      current = i;
      update();
    });
    pager.appendChild(dot);
  }
}

function update() {
  const galleryWidth = document.querySelector('.gallery').offsetWidth;
  const offset = current * galleryWidth;
  images.style.transform = `translateX(-${offset}px)`; // ✅ исправлено: используем ``
  renderPager();
}

next.addEventListener("click", () => {
  const totalPages = Math.ceil(total / perPage);
  current = (current + 1) % totalPages;
  update();
});

prev.addEventListener("click", () => {
  const totalPages = Math.ceil(total / perPage);
  current = (current - 1 + totalPages) % totalPages;
  update();
});

window.addEventListener("resize", () => {
  perPage = window.innerWidth <= 600 ? 1 : 3;
  current = 0;
  update();
});

update();
