type ConfettiOptions = {
  durationMs?: number;
  count?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  life: number;
  maxLife: number;
  color: string;
};

const COLORS = [
  "#ff6b6b",
  "#ffd93d",
  "#6bcBef",
  "#6bff95",
  "#b86bff",
  "#ff8fd8",
  "#ffffff",
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function shootConfetti(options: ConfettiOptions = {}) {
  const { durationMs = 1400, count = 140 } = options;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const dpr = Math.max(1, window.devicePixelRatio || 1);

  function resize() {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  const particles: Particle[] = [];
  const w = () => window.innerWidth;
  const h = () => window.innerHeight;

  // “залп” из двух точек (слева/справа сверху)
  const emitPoints = [
    { x: w() * 0.25, y: h() * 0.15 },
    { x: w() * 0.75, y: h() * 0.15 },
  ];

  for (let i = 0; i < count; i++) {
    const p = emitPoints[i % emitPoints.length];
    const angle = rand(-Math.PI * 0.85, -Math.PI * 0.15);
    const speed = rand(6, 13);

    particles.push({
      x: p.x + rand(-20, 20),
      y: p.y + rand(-10, 10),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: rand(4, 8),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.2, 0.2),
      life: 0,
      maxLife: rand(durationMs * 0.6, durationMs),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
    });
  }

  let raf = 0;
  const start = performance.now();

  function tick(now: number) {
    const t = now - start;

    ctx.clearRect(0, 0, w(), h());

    // простая физика: гравитация + “сопротивление”
    const gravity = 0.18;
    const drag = 0.992;

    for (const p of particles) {
      p.life += 16;

      p.vx *= drag;
      p.vy = p.vy * drag + gravity;

      p.x += p.vx;
      p.y += p.vy;

      p.rot += p.vr;

      const alpha = Math.max(0, 1 - p.life / p.maxLife);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.8);
      ctx.restore();
    }

    if (t < durationMs) {
      raf = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.remove();
    }
  }

  window.addEventListener("resize", resize);
  raf = requestAnimationFrame(tick);
}
