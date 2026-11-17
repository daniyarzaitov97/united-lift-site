/* Интерфейс: меню и кнопки. Приёмы описаны в docs/motion.md → Hover (btn-doors, menu-roll, seg-chip).
   Работает и в ?static: разметка готовится одинаково, без неё вид кнопок и меню не совпадёт со скриншотами. */

/* Кнопка: лицевая сторона и тёмная копия, которая раскрывается створками при наведении (btn-doors) */
const initButtons = () => {
  document.querySelectorAll('.btn').forEach(b => {
    if (b.querySelector('.btn__face')) return;
    const face = document.createElement('span'); face.className = 'btn__face';
    while (b.firstChild) face.appendChild(b.firstChild);
    const hover = document.createElement('span'); hover.className = 'btn__hover'; hover.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span'); inner.className = 'btn__in'; inner.innerHTML = face.innerHTML;
    hover.appendChild(inner);
    b.append(face, hover);
  });
};

import { t } from './i18n.js';

/* Белый чип под активным пунктом (seg-chip); нет активного (первый экран) – чип сжимается в ноль */
const placeChip = seg => {
  const a = seg.querySelector('a.is-active'), chip = seg.querySelector('.seg__chip');
  if (!chip) return;
  if (!a) { chip.style.width = '0px'; return; }
  chip.style.width = `${a.offsetWidth}px`;
  chip.style.transform = `translateX(${a.offsetLeft}px)`;
};

const initNav = () => {
  const root = document.documentElement;
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const segs = [...document.querySelectorAll('.seg')];
  const sections = document.querySelector('.nav__center .seg');

  /* menu-roll: текст пункта в строке-маске с копией снизу */
  nav.querySelectorAll('.seg a').forEach(a => {
    const t = a.textContent.trim();
    a.textContent = '';
    const ln = document.createElement('span'); ln.className = 'ln';
    const s = document.createElement('span'); s.dataset.text = t; s.textContent = t;
    ln.appendChild(s); a.appendChild(ln);
  });

  const placeAll = () => segs.forEach(placeChip);
  placeAll();
  document.fonts && document.fonts.ready.then(placeAll);
  window.addEventListener('resize', placeAll);

  /* язык: ссылки ?lang=… подставляет js/i18n.js, страница перезагружается на выбранном языке */

  /* активный раздел и светлые секции под меню – по положению страницы */
  const ids = sections ? [...sections.querySelectorAll('a')].map(a => a.dataset.for) : [];
  const light = [...document.querySelectorAll('[data-surface="light"]')];
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = nav.offsetHeight / 2;
    nav.classList.toggle('on-light', light.some(s => { const r = s.getBoundingClientRect(); return r.top <= line && r.bottom > line; }));
    if (!sections) return;
    const mid = window.innerHeight / 2;
    /* секция под серединой экрана; если своего пункта у неё нет – ближайший пункт выше; на первом экране активного нет */
    const all = [...document.querySelectorAll('section[id]')];
    const at = all.findIndex(el => { const r = el.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; });
    if (at < 0) return;
    const current = all.slice(0, at + 1).reverse().map(el => el.id).find(id => ids.includes(id));
    sections.querySelectorAll('a').forEach(a => a.classList.toggle('is-active', a.dataset.for === current));
    placeChip(sections);
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  /* мобильное меню: лист на весь экран */
  const menuBtn = nav.querySelector('.menu-btn');
  if (menuBtn) {
    const toggle = open => { root.classList.toggle('nav-open', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? t('Закрыть') : t('Меню'); };
    menuBtn.addEventListener('click', () => toggle(!root.classList.contains('nav-open')));
    document.querySelectorAll('.sheet a').forEach(a => a.addEventListener('click', () => toggle(false)));
  }
};

/* stage-stack: плашки этапов прилипают под заголовком секции – его высота в --stack-head (меняется с шириной и шрифтом) */
const initStackHead = () => {
  const section = document.querySelector('.process'), head = section && section.querySelector('.process__head');
  if (!head) return;
  const set = () => section.style.setProperty('--stack-head', `${head.offsetHeight}px`);
  set();
  document.fonts && document.fonts.ready.then(set);
  if ('ResizeObserver' in window) new ResizeObserver(set).observe(head);

  /* заголовок уезжает вместе с последней плашкой: как только она поднимается выше своего места в стопке,
     заголовок сдвигается вверх на столько же (решение клиента 2026-11-06), а не стоит, пока плашка проходит под ним */
  const rows = section.querySelectorAll('.prow');
  const last = rows[rows.length - 1];
  if (!last) return;
  let ticking = false;
  const follow = () => {
    ticking = false;
    if (getComputedStyle(head).position !== 'sticky') { head.style.transform = ''; return; }
    const slot = parseFloat(getComputedStyle(last).top) || 0;
    const d = Math.min(0, last.getBoundingClientRect().top - slot);
    head.style.transform = d ? `translateY(${d}px)` : '';
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(follow); } }, { passive: true });
  window.addEventListener('resize', follow);
  follow();
};

export const initUI = () => { initButtons(); initNav(); initStackHead(); };
export { placeChip };
