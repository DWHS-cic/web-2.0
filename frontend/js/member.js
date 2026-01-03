/** member.js **/

// 幹部資料，新增 year 欄位代表屆別
const members = [
  {
    year: "116th",
    src: "../frontend/assets/116th-/Committee/社師.webp",
    role: "社師",
    name: "CX330",
  },
  {
    year: "116th",
    src: "../frontend/assets/116th-/Committee/社長.webp",
    role: "社長",
    name: "蘇俊睿",
  },
  {
    year: "116th",
    src: "../frontend/assets/116th-/Committee/副社.webp",
    role: "副社長",
    name: "劉奕鈞",
  },
  {
    year: "116th",
    src: "../frontend/assets/116th-/Committee/美宣.webp",
    role: "美宣",
    name: "邱苙淇",
  },
  {
    year: "116th",
    src: "../frontend/assets/116th-/Committee/公關1.webp",
    role: "公關",
    name: "劉恩浩",
  },
  {
    year: "116th",
    src: "../frontend/assets/116th-/Committee/公關2.webp",
    role: "公關",
    name: "許煒苙",
  },
  {
    year: "116th",
    src: "../frontend/assets/116th-/Committee/文書.webp",
    role: "文書",
    name: "古彥玲",
  },

  {
    year: "創社元老",
    src: "../frontend/assets/Founder/楊昕翰.webp",
    role: "創社元老",
    name: "楊昕翰",
  },
  {
    year: "創社元老",
    src: "../frontend/assets/Founder/李沛暄.webp",
    role: "創社元老",
    name: "李沛暄",
  },
  {
    year: "創社元老",
    src: "../frontend/assets/Founder/林志豪.webp",
    role: "創社元老",
    name: "林志豪",
  },
  {
    year: "創社元老",
    src: "../frontend/assets/Founder/蔡易頡.webp",
    role: "創社元老",
    name: "蔡易頡",
  },
  {
    year: "創社元老",
    src: "../frontend/assets/Founder/蘇俊睿.webp",
    role: "創社元老",
    name: "蘇俊睿",
  },
];

const gridContainer = document.getElementById("eb-member-grid");

// ----------- ElectricBorder 函式（保持原本不變） -----------
function ElectricBorder(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let time = 0;
  let lastFrame = 0;
  const color = "rgba(0, 255, 0, 1)";
  const speed = 2;
  const chaos = 0.25;
  const borderRadius = 12;
  const displacement = 15;
  const borderOffset = 5;

  function random(x) {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1;
  }
  function noise2D(x, y) {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;
    const a = random(i + j * 57);
    const b = random(i + 1 + j * 57);
    const c = random(i + (j + 1) * 57);
    const d = random(i + 1 + (j + 1) * 57);
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    return (
      a * (1 - ux) * (1 - uy) +
      b * ux * (1 - uy) +
      c * (1 - ux) * uy +
      d * ux * uy
    );
  }

  function octavedNoise(
    x,
    octaves,
    lacunarity,
    gain,
    baseAmplitude,
    baseFrequency,
    time,
    seed,
    baseFlatness
  ) {
    let y = 0,
      amplitude = baseAmplitude,
      frequency = baseFrequency;
    for (let i = 0; i < octaves; i++) {
      let octaveAmplitude = amplitude;
      if (i === 0) octaveAmplitude *= baseFlatness;
      y +=
        octaveAmplitude *
        noise2D(frequency * x + seed * 100, time * frequency * 0.3);
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return y;
  }

  function getCornerPoint(cx, cy, radius, startAngle, arcLength, progress) {
    const angle = startAngle + progress * arcLength;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  function getRoundedRectPoint(t, left, top, width, height, radius) {
    const straightWidth = width - 2 * radius;
    const straightHeight = height - 2 * radius;
    const cornerArc = (Math.PI * radius) / 2;
    const totalPerimeter =
      2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
    const distance = t * totalPerimeter;
    let accumulated = 0;

    if (distance <= accumulated + straightWidth)
      return { x: left + radius + (distance - accumulated), y: top };
    accumulated += straightWidth;
    if (distance <= accumulated + cornerArc)
      return getCornerPoint(
        left + width - radius,
        top + radius,
        radius,
        -Math.PI / 2,
        Math.PI / 2,
        (distance - accumulated) / cornerArc
      );
    accumulated += cornerArc;
    if (distance <= accumulated + straightHeight)
      return { x: left + width, y: top + radius + (distance - accumulated) };
    accumulated += straightHeight;
    if (distance <= accumulated + cornerArc)
      return getCornerPoint(
        left + width - radius,
        top + height - radius,
        radius,
        0,
        Math.PI / 2,
        (distance - accumulated) / cornerArc
      );
    accumulated += cornerArc;
    if (distance <= accumulated + straightWidth)
      return {
        x: left + width - radius - (distance - accumulated),
        y: top + height,
      };
    accumulated += straightWidth;
    if (distance <= accumulated + cornerArc)
      return getCornerPoint(
        left + radius,
        top + height - radius,
        radius,
        Math.PI / 2,
        Math.PI / 2,
        (distance - accumulated) / cornerArc
      );
    accumulated += cornerArc;
    if (distance <= accumulated + straightHeight)
      return { x: left, y: top + height - radius - (distance - accumulated) };
    accumulated += straightHeight;
    const progress = (distance - accumulated) / cornerArc;
    return getCornerPoint(
      left + radius,
      top + radius,
      radius,
      Math.PI,
      Math.PI / 2,
      progress
    );
  }

  function updateSize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    return { width: rect.width, height: rect.height };
  }

  let { width, height } = updateSize();

  function draw(currentTime) {
    const deltaTime = (currentTime - lastFrame) / 1000;
    time += deltaTime * speed;
    lastFrame = currentTime;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const left = borderOffset,
      top = borderOffset;
    const borderWidth = width - 2 * borderOffset;
    const borderHeight = height - 2 * borderOffset;
    const radius = Math.min(
      borderRadius,
      Math.min(borderWidth, borderHeight) / 2
    );

    const approxPerimeter =
      2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
    const sampleCount = Math.floor(approxPerimeter / 2);

    ctx.beginPath();
    for (let i = 0; i <= sampleCount; i++) {
      const progress = i / sampleCount;
      const point = getRoundedRectPoint(
        progress,
        left,
        top,
        borderWidth,
        borderHeight,
        radius
      );
      const xNoise = octavedNoise(
        progress * 8,
        10,
        1.6,
        0.7,
        chaos,
        10,
        time,
        0,
        0
      );
      const yNoise = octavedNoise(
        progress * 8,
        4,
        1.6,
        0.7,
        chaos,
        10,
        time,
        1,
        0
      );
      const x = point.x + xNoise * displacement;
      const y = point.y + yNoise * displacement;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    const newSize = updateSize();
    width = newSize.width;
    height = newSize.height;
  });

  requestAnimationFrame(draw);
}

// ----------- 初始化會員卡片（多屆版） -----------
let currentYear = "";
members.forEach((m) => {
  if (m.year !== currentYear) {
    currentYear = m.year;
    const yearTitle = document.createElement("h2");
    yearTitle.textContent = currentYear;
    yearTitle.className = "member-year";
    gridContainer.appendChild(yearTitle);
  }

  const card = document.createElement("div");
  card.className = "member-card";

  const canvasContainer = document.createElement("div");
  canvasContainer.className = "eb-canvas-container";
  const canvas = document.createElement("canvas");
  canvas.className = "eb-canvas";
  canvasContainer.appendChild(canvas);

  const img = document.createElement("img");
  img.src = m.src;
  img.alt = m.name;

  const info = document.createElement("div");
  info.className = "member-info";
  info.innerHTML = `<p>${m.role} - ${m.name}</p>`;

  card.appendChild(canvasContainer);
  card.appendChild(img);
  card.appendChild(info);
  gridContainer.appendChild(card);

  ElectricBorder(canvas);
});
