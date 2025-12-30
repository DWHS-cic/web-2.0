const words = ["1", "0", "DWCIC", "404", "ERROR"];

const bg = document.getElementById("floating-bg");
const totalWords = 100; //數量
const floatingWords = [];

for (let i = 0; i < totalWords; i++) {
  const wordElem = document.createElement("span");
  const text = words[Math.floor(Math.random() * words.length)];
  wordElem.innerText = text;

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  const speedX = (Math.random() - 0.5) * 1;
  const speedY = (Math.random() - 0.5) * 1;

  wordElem.style.fontSize = 12 + Math.random() * 20 + "px";

  wordElem.style.left = x + "px";
  wordElem.style.top = y + "px";

  bg.appendChild(wordElem);

  floatingWords.push({ elem: wordElem, x, y, speedX, speedY });
}

function animate() {
  floatingWords.forEach((w) => {
    w.x += w.speedX;
    w.y += w.speedY;
    if (w.x < 0 || w.x > window.innerWidth - w.elem.offsetWidth) w.speedX *= -1;
    if (w.y < 0 || w.y > window.innerHeight - w.elem.offsetHeight)
      w.speedY *= -1;

    w.elem.style.left = w.x + "px";
    w.elem.style.top = w.y + "px";
  });

  requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize", () => {
  floatingWords.forEach((w) => {
    if (w.x > window.innerWidth) w.x = window.innerWidth - w.elem.offsetWidth;
    if (w.y > window.innerHeight)
      w.y = window.innerHeight - w.elem.offsetHeight;
  });
});

/*========== 文字切換方格 ==========*/
const track = document.getElementById("carousel-track");
const indicatorsContainer = document.getElementById("carousel-indicators");
const items = track.children;
let currentIndex = 0;
const totalItems = items.length;

for (let i = 0; i < totalItems; i++) {
  const dot = document.createElement("div");
  dot.classList.add("carousel-indicator");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToIndex(i));
  indicatorsContainer.appendChild(dot);
}

const indicators = indicatorsContainer.children;

function goToIndex(index) {
  currentIndex = index;
  updateCarousel();
}

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  for (let i = 0; i < indicators.length; i++) {
    indicators[i].classList.toggle("active", i === currentIndex);
  }
}

// 左右按鈕
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateCarousel();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
});

/*========== 歷史時間軸 ==========*/
const timelineItems = document.querySelectorAll(".timeline-item");

function checkPosition() {
  const centerY = window.innerHeight / 2;

  timelineItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;

    if (Math.abs(itemCenter - centerY) < rect.height / 2) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", checkPosition);
window.addEventListener("load", checkPosition);
