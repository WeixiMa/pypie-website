const DEFAULT_TYPE = "float";
const HOVER_RADIUS = 10;
const typeMap = new Map();
let rectEntries = [];

const getPosKey = (rect) => {
  const left = Math.round(rect.left);
  const top = Math.round(rect.top);
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);
  return `${left}:${top}:${width}:${height}`;
};

const rebuildMap = () => {
  typeMap.clear();
  rectEntries = [];
  const vars = document.querySelectorAll(".code-var");
  vars.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const key = getPosKey(rect);
    typeMap.set(key, DEFAULT_TYPE);
    rectEntries.push({ rect, key });
  });
};

const findTypeAt = (x, y) => {
  for (const entry of rectEntries) {
    const rect = entry.rect;
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return typeMap.get(entry.key) || DEFAULT_TYPE;
    }
  }
  let nearest = null;
  let nearestDist = Infinity;
  for (const entry of rectEntries) {
    const rect = entry.rect;
    const cx = (rect.left + rect.right) / 2;
    const cy = (rect.top + rect.bottom) / 2;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = entry;
    }
  }
  if (nearest && nearestDist <= HOVER_RADIUS) {
    return typeMap.get(nearest.key) || DEFAULT_TYPE;
  }
  return null;
};

const tooltip = document.querySelector(".code-type-tooltip");
const hero = document.querySelector(".hero");

if (tooltip && hero) {
  const show = (x, y, type) => {
    tooltip.textContent = type;
    tooltip.style.opacity = "1";
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  };

  const hide = () => {
    tooltip.style.opacity = "0";
  };

  const handleMove = (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest(".hero-content")) {
      hide();
      return;
    }
    const heroRect = hero.getBoundingClientRect();
    if (
      event.clientX < heroRect.left ||
      event.clientX > heroRect.right ||
      event.clientY < heroRect.top ||
      event.clientY > heroRect.bottom
    ) {
      hide();
      return;
    }
    const type = findTypeAt(event.clientX, event.clientY);
    if (!type) {
      if (rectEntries.length === 0) {
        show(event.clientX, event.clientY, DEFAULT_TYPE);
        return;
      }
      hide();
      return;
    }
    show(event.clientX, event.clientY, type);
  };

  const rebuildAndSync = () => {
    rebuildMap();
  };

  window.addEventListener("resize", rebuildAndSync);
  window.addEventListener("load", rebuildAndSync);

  document.addEventListener("mousemove", handleMove);
  hero.addEventListener("mouseleave", hide);

  if (document.fonts && "ready" in document.fonts) {
    document.fonts.ready.then(rebuildAndSync);
  }
  requestAnimationFrame(rebuildAndSync);
}
