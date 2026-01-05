/**
 * about.js - About page specific logic
 * Handles: floating background text, carousel, timeline animations
 */

// ========== Floating Background Text ==========
const floatingBgElement = document.getElementById("floating-bg");

function initFloatingText() {
  if (!floatingBgElement) return;

  const words = ["1", "0", "DWCIC", "404", "ERROR"];
  const totalWords = 100;
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

    floatingBgElement.appendChild(wordElem);

    floatingWords.push({ elem: wordElem, x, y, speedX, speedY });
  }

  function animateFloating() {
    floatingWords.forEach((w) => {
      w.x += w.speedX;
      w.y += w.speedY;
      if (w.x < 0 || w.x > window.innerWidth - w.elem.offsetWidth)
        w.speedX *= -1;
      if (w.y < 0 || w.y > window.innerHeight - w.elem.offsetHeight)
        w.speedY *= -1;

      w.elem.style.left = w.x + "px";
      w.elem.style.top = w.y + "px";
    });

    requestAnimationFrame(animateFloating);
  }

  animateFloating();

  window.addEventListener("resize", () => {
    floatingWords.forEach((w) => {
      if (w.x > window.innerWidth) w.x = window.innerWidth - w.elem.offsetWidth;
      if (w.y > window.innerHeight)
        w.y = window.innerHeight - w.elem.offsetHeight;
    });
  });
}

// ========== Carousel/Text Switch Grid ==========
function initCarousel() {
  const track = document.getElementById("carousel-track");
  const indicatorsContainer = document.getElementById("carousel-indicators");

  if (!track || !indicatorsContainer) return;

  const items = track.children;
  let currentIndex = 0;
  const totalItems = items.length;

  // Create indicators
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

  // Button controls
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });
  }
}

// ========== Timeline Animation ==========
function initTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (timelineItems.length === 0) return;

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
}

// ========== Initialize all About page features ==========
window.addEventListener("DOMContentLoaded", () => {
  initFloatingText();
  initCarousel();
  initTimeline();
});
