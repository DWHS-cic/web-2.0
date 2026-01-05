/**
 * main.js - Global shared logic for all pages
 * Handles: loading screen, navbar, footer setup
 */

// ========== Global Loading Screen ==========
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.classList.add("hidden");
    }
  }, 2000); // 2秒延遲後開始
});

// Export utilities for page-specific scripts
export const AnimationUtils = {
  /**
   * Count-up animation for numbers
   * @param {HTMLElement} el - Element with data-to and data-duration attributes
   */
  animateCountUp(el) {
    const to = parseFloat(el.dataset.to);
    const duration = parseFloat(el.dataset.duration) || 2;
    const from = 0;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const current = from + (to - from) * progress;

      el.textContent = Math.floor(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  },

  /**
   * Decrypt/typewriter effect for text
   * @param {HTMLElement} element - Element to animate
   * @param {Object} options - speed, scrambleTimes
   */
  typeDecryptEffect(element, options = {}) {
    const CHARS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    class TypeDecryptText {
      constructor(el, opts) {
        this.el = el;
        this.text = el.innerText;
        this.speed = opts.speed || 50;
        this.scrambleTimes = opts.scrambleTimes || 2;
        this.index = 0;
        this.scrambleCount = 0;
        this.el.textContent = "";
        this.startStep();
      }

      startStep() {
        if (this.index >= this.text.length) return;
        const currentChar = this.text[this.index];

        if (currentChar === "\n" || currentChar === " ") {
          this.el.textContent += currentChar;
          this.index++;
          this.scrambleCount = 0;
        } else if (this.scrambleCount < this.scrambleTimes) {
          this.el.textContent =
            this.text.slice(0, this.index) +
            CHARS[Math.floor(Math.random() * CHARS.length)];
          this.scrambleCount++;
        } else {
          this.el.textContent = this.text.slice(0, this.index + 1);
          this.index++;
          this.scrambleCount = 0;
        }

        const randomSpeed = Math.floor(Math.random() * 70) + 30;
        setTimeout(() => this.startStep(), randomSpeed);
      }
    }

    new TypeDecryptText(element, options);
  },
};
