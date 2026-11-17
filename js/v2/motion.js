/* Реестр приёмов data-reveal. Каждый приём описан в docs/motion.md до того, как появился здесь.
   Порядок в элементе: подготовить начальное состояние → пометить is-ready (снять visibility: hidden) → твин по ScrollTrigger.
   Переопределения из разметки: data-reveal-delay="0.2", data-reveal-stagger="0.05". */
const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const num = (el, key, fallback) => (el.dataset[key] !== undefined ? parseFloat(el.dataset[key]) : fallback);
const ready = el => el.classList.add('is-ready');
const trigger = (el, once = true) => ({ trigger: el, start: 'top 85%', once });
const yPx = () => parseFloat(css('--reveal-y')) || 24;

export const PRESETS = {
  'fade': (el) => {
    gsap.set(el, { autoAlpha: 0, y: yPx() }); ready(el);
    gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: num(el, 'revealDelay', 0), scrollTrigger: trigger(el) });
  },
  'lines': (el) => {
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' }); ready(el);
    gsap.from(split.lines, { yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: num(el, 'revealStagger', 0.08), delay: num(el, 'revealDelay', 0), scrollTrigger: trigger(el), onComplete: () => split.revert() });
  },
  'chars': (el) => {
    const split = SplitText.create(el, { type: 'lines,chars', mask: 'lines', linesClass: 'line' }); ready(el);
    gsap.from(split.chars, { yPercent: 110, duration: 1, ease: 'power4.out', stagger: num(el, 'revealStagger', 0.025), delay: num(el, 'revealDelay', 0), scrollTrigger: trigger(el), onComplete: () => split.revert() });
  },
  'clip': (el) => {
    gsap.set(el, { clipPath: 'inset(100% 0 0 0)' }); ready(el);
    gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: css('--ease-sharp') || 'power4.inOut', delay: num(el, 'revealDelay', 0), scrollTrigger: trigger(el) });
  },
  'card': (el) => {
    const kids = Array.from(el.children);
    gsap.set(el, { autoAlpha: 0, y: yPx() * 2, scale: 0.98 }); gsap.set(kids, { autoAlpha: 0, y: yPx() * 0.6 }); ready(el);
    const tl = gsap.timeline({ scrollTrigger: trigger(el), delay: num(el, 'revealDelay', 0) });
    tl.to(el, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' })
      .to(kids, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: num(el, 'revealStagger', 0.1) }, '-=0.5');
  },
  'stagger': (el) => {
    const kids = Array.from(el.children);
    gsap.set(kids, { autoAlpha: 0, y: yPx() }); ready(el);
    gsap.to(kids, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: num(el, 'revealStagger', 0.08), delay: num(el, 'revealDelay', 0), scrollTrigger: trigger(el) });
  },
  'roll': (el) => {
    /* барабан цифр: текст элемента – итоговое значение (в статике виден как есть) */
    const val = el.textContent.trim();
    el.setAttribute('aria-label', val);
    el.textContent = '';
    el.classList.add('roll');
    const cols = [];
    [...val].forEach(ch => {
      if (/\d/.test(ch)) {
        const box = document.createElement('span'); box.className = 'roll__box'; box.setAttribute('aria-hidden', 'true');
        const col = document.createElement('span'); col.className = 'roll__col';
        for (let k = 0; k < 20; k++) { const s = document.createElement('span'); s.textContent = k % 10; col.appendChild(s); }
        box.appendChild(col); el.appendChild(box);
        /* ширина колонки – по своей цифре, иначе узкая «1» стоит в колонке ширины «0» */
        const probe = document.createElement('span'); probe.textContent = ch; probe.className = 'roll__probe'; el.appendChild(probe);
        box.style.width = `${probe.getBoundingClientRect().width}px`; probe.remove();
        cols.push({ col, d: +ch });
      } else {
        const s = document.createElement('span'); s.className = 'roll__ch'; s.setAttribute('aria-hidden', 'true'); s.textContent = ch; el.appendChild(s);
      }
    });
    const set = k => cols.forEach(({ col, d }) => { col.style.transform = `translateY(${-(10 + d) * k}em)`; });
    set(0); ready(el);
    const o = { k: 0 };
    gsap.to(o, { k: 1, duration: 1.8, ease: 'expo.out', delay: num(el, 'revealDelay', 0), onUpdate: () => set(o.k), scrollTrigger: trigger(el) });
  },
  'float': (el) => {
    const v = 120 * num(el, 'revealSpeed', 1);
    ready(el);
    gsap.fromTo(el, { y: v }, { y: -v, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  },
  'scrub': (el) => {
    /* Прогресс прокрутки элемента через экран → CSS-переменная --p (0…1). Что с ней делать, решает правило секции */
    ready(el);
    gsap.fromTo(el, { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  },
};

export const initMotion = () => {
  gsap.config({ nullTargetWarn: false });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const name = el.dataset.reveal;
    const fn = PRESETS[name];
    if (!fn) { console.warn(`motion: приёма "${name}" нет в реестре (docs/motion.md)`); ready(el); return; }
    fn(el);
  });
  ScrollTrigger.refresh();
};
