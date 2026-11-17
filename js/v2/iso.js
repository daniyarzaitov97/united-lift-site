/* Изометрические рентген-схемы этапов работ (секция process). SVG строится из точек в метрах одной проекцией:
   всё бледно (.x-soft / .x-mid), ярко – то, что добавилось на этапе (.x-hi). Один и тот же лифт собирается от этапа к этапу.
   Живые схемы – приём stage-loop (docs/motion.md): группы с классами .a-* двигаются циклом, смещения считаются здесь из масштаба. */
const NS = 'http://www.w3.org/2000/svg';
const C = Math.cos(Math.PI / 6);
const STAGE = { k: 19, ox: 180, oy: 178 }; /* окно 360 × 240 (3 : 2), лифт по центру */

const draw = (svg, build) => {
  const { k, ox, oy } = STAGE;
  const P = (x, y, z) => [ox + (x - y) * C * k, oy + (x + y) * 0.5 * k - z * k];
  /* смещение в экранных координатах для сдвига на (dx, dy, dz) метров */
  const shift = (dx, dy, dz) => [(dx - dy) * C * k, (dx + dy) * 0.5 * k - dz * k].map(v => `${v.toFixed(1)}px`);
  const group = (cls, parent = svg) => { const g = document.createElementNS(NS, 'g'); if (cls) g.setAttribute('class', cls); parent.appendChild(g); return g; };
  const path = (g, cls, pts, close, draw1) => {
    const e = document.createElementNS(NS, 'path');
    e.setAttribute('d', pts.map((p, i) => (i ? 'L' : 'M') + P(...p).map(v => v.toFixed(1)).join(' ')).join(' ') + (close ? ' Z' : ''));
    e.setAttribute('class', cls);
    if (draw1) e.setAttribute('pathLength', '1');
    g.appendChild(e); return e;
  };
  const rect = (g, cls, x0, y0, x1, y1, z, fill) => {
    if (fill) path(g, 'x-fill', [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], true);
    path(g, cls, [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], true);
  };
  const box = (g, cls, x0, y0, z0, x1, y1, z1, fill) => {
    if (fill) {
      path(g, 'x-fill', [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], true);
      path(g, 'x-fill', [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], true);
    }
    rect(g, cls, x0, y0, x1, y1, z0); rect(g, cls, x0, y0, x1, y1, z1);
    [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].forEach(([x, y]) => path(g, cls, [[x, y, z0], [x, y, z1]]));
  };
  /* общая основа: перекрытия трёх этажей; шахта */
  const base = () => { const s = group(); [0, 2.5, 5].forEach(z => rect(s, 'x-soft', -1, -1, 3, 3, z)); return s; };
  const shaft = (g, cls) => box(g, cls, 0, 0, -0.3, 2, 2, 7.6);
  build({ group, path, rect, box, base, shaft, shift });
};

const STAGES = {
  /* 1 подбор: шахты ещё нет – её место в здании; контур бежит, след на полу «дышит» */
  'stage-1': ({ group, rect, base, shaft }) => {
    base();
    shaft(group('a-run'), 'x-soft x-run');
    rect(group('a-pulse'), 'x-hi', 0, 0, 2, 2, 0, true);
  },
  /* 2 проектирование: размеры шахты прорисовываются */
  'stage-2': ({ group, path, base, shaft }) => {
    const s = base(); shaft(s, 'x-mid');
    const d = group('a-draw');
    path(d, 'x-hi', [[0, 2.5, 0], [2, 2.5, 0]], false, true);
    [0, 2].forEach(x => path(d, 'x-hi', [[x, 2.3, 0], [x, 2.7, 0]], false, true));
    path(d, 'x-hi', [[2.5, 0, -0.3], [2.5, 0, 7.6]], false, true);
    [-0.3, 7.6].forEach(z => path(d, 'x-hi', [[2.3, 0, z], [2.7, 0, z]], false, true));
  },
  /* 3 поставка: ящики с оборудованием опускаются к шахте по очереди */
  'stage-3': ({ group, box, base, shaft, shift }) => {
    const s = base(); shaft(s, 'x-soft');
    [[2.5, 0, 0, 3.9, 1.3, 1], [2.5, 1.5, 0, 3.4, 2.4, 0.6], [2.5, -1, 0, 4.3, -0.7, 0.15]].forEach((b, i) => {
      const g = group('a-drop');
      g.style.setProperty('--drop', shift(0, 0, 2)[1]);
      g.style.setProperty('--d', `${i * 0.25}s`);
      box(g, 'x-hi', ...b, true);
    });
  },
  /* 4 монтаж: направляющие прорисовываются, рама кабины поднимается по ним, лебёдка наверху */
  'stage-4': ({ group, path, box, base, shaft, shift }) => {
    const s = base(); shaft(s, 'x-mid');
    const r = group('a-draw');
    [0.2, 1.8].forEach(x => path(r, 'x-hi', [[x, 1, -0.3], [x, 1, 7.6]], false, true));
    box(group(), 'x-hi', 0.5, 0.6, 7.6, 1.5, 1.4, 8.1, true);
    const c = group('a-hoist');
    c.style.setProperty('--rise', shift(0, 0, 2.5)[1]);
    box(c, 'x-hi', 0.3, 0.3, 0, 1.7, 1.7, 2.2);
  },
  /* 5 пусконаладка: кабина на этаже, двери расходятся и сходятся */
  'stage-5': ({ group, path, box, base, shaft, shift }) => {
    const s = base(); shaft(s, 'x-mid');
    [0.2, 1.8].forEach(x => path(s, 'x-mid', [[x, 1, -0.3], [x, 1, 7.6]]));
    box(s, 'x-mid', 0.5, 0.6, 7.6, 1.5, 1.4, 8.1);
    path(s, 'x-mid', [[1, 1, 4.7], [1, 1, 7.6]]);
    box(group(), 'x-hi', 0.3, 0.3, 2.5, 1.7, 1.7, 4.7, true);
    [-1, 1].forEach(side => {
      const d = group('a-door');
      const [dx, dy] = shift(side * 0.45, 0, 0);
      d.style.setProperty('--dx', dx); d.style.setProperty('--dy', dy);
      path(d, 'x-hi', [[1, 1.7, 2.5], [1, 1.7, 4.5]]);
    });
  }
};

export const initIso = () => document.querySelectorAll('[data-iso]').forEach(svg => {
  const build = STAGES[svg.dataset.iso];
  if (build && !svg.childElementCount) draw(svg, build);
});
