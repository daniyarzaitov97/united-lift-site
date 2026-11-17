/* Three.js-сцена hero – «рентген лифта». Правила – docs/scene.md, приём – docs/motion.md → Сцена → xray-ride.
   Грузится лениво из main.js, когда [data-scene] близко к экрану, только при включённом движении и WebGL.
   Инфраструктура: рендерер с потолком DPR 2 (1,5 на телефоне), ресайз, пауза вне экрана, цвета из токенов.
   Модель процедурная: шахта, перекрытия, направляющие, кабина, противовес, канаты, лебёдка – всё линиями, кабина ярче всего. */
import * as THREE from 'three';

const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const mobile = () => window.matchMedia('(max-width: 768px)').matches;

/* Поездки кабины: этажи остановок и тайминги (s). Меняются здесь, описание – docs/motion.md */
const RIDE = { start: 5, stops: [8, 3, 10, 6, 2, 9, 5], doorsClose: 0.8, travel: 1.4, perFloor: 0.38, doorsOpen: 1, dwell: 2.4 };

/* Объект сцены: строит модель, возвращает update() для каждого кадра */
const buildObject = (scene, camera, state) => {
  const WHITE = new THREE.Color(css('--scene-line') || '#ffffff');
  const a = name => parseFloat(css(name));
  const FL = 12, FH = 3, W = 2.4, D = 2.2, TOP = FL * FH + 3.2;
  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
  const L = o => new THREE.LineBasicMaterial({ color: WHITE, transparent: true, opacity: o, clippingPlanes: [clip] });
  const F = o => new THREE.MeshBasicMaterial({ color: WHITE, transparent: true, opacity: o, depthWrite: false, side: THREE.DoubleSide, clippingPlanes: [clip] });
  const mFaint = L(a('--scene-alpha-faint')), mSoft = L(a('--scene-alpha-soft')), mMid = L(a('--scene-alpha-mid')), mHi = L(1);
  const fCab = F(a('--scene-alpha-cabin')), fDoor = F(0.22), fLight = F(0.7), fSlab = F(0.03), fGlow = F(0.08);

  const model = new THREE.Group(); scene.add(model);
  const edges = (geo, mat, parent = model) => { const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), mat); parent.add(e); return e; };
  const boxE = (w, h, d, x, y, z, mat, fill, parent = model) => {
    const g = new THREE.BoxGeometry(w, h, d);
    const e = edges(g, mat, parent); e.position.set(x, y, z);
    let m = null;
    if (fill) { m = new THREE.Mesh(g, fill); m.position.set(x, y, z); parent.add(m); }
    return { e, m };
  };
  const line = (pts, mat, parent = model) => { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p))), mat); parent.add(l); return l; };

  /* шахта, перекрытия, проёмы этажей */
  boxE(W, TOP, D, 0, TOP / 2, 0, mMid);
  for (let i = 0; i <= FL; i++) {
    const y = i * FH;
    boxE(W + 5, 0.22, D + 4, 0, y - 0.11, 0, mFaint, fSlab);
    if (i < FL) line([[-0.5, y, D / 2], [-0.5, y + 2.1, D / 2], [0.5, y + 2.1, D / 2], [0.5, y, D / 2]], mSoft);
  }
  /* направляющие кабины и противовеса, кронштейны, приямок */
  [-1, 1].forEach(s => {
    boxE(0.06, TOP - 0.4, 0.1, s * (W / 2 - 0.16), TOP / 2 - 0.2, 0, mSoft);
    for (let y = 1; y < TOP; y += 2.4) line([[s * (W / 2 - 0.16), y, 0], [s * W / 2, y, 0]], mFaint);
    boxE(0.04, TOP - 0.4, 0.06, s * 0.46, TOP / 2 - 0.2, -D / 2 + 0.16, mFaint);
  });
  [-0.5, 0.5].forEach(x => edges(new THREE.CylinderGeometry(0.12, 0.12, 0.5, 16), mFaint).position.set(x, -0.75, 0));
  boxE(W, 1, D, 0, -0.5, 0, mFaint);

  /* лебёдка */
  const machine = new THREE.Group(); machine.position.set(0, TOP - 1.1, -0.45); model.add(machine);
  boxE(1.4, 0.12, 0.9, 0, -0.3, 0, mSoft, null, machine);
  const motor = new THREE.CylinderGeometry(0.32, 0.32, 0.7, 24); motor.rotateZ(Math.PI / 2); edges(motor, mSoft, machine).position.set(-0.35, 0.05, 0);
  const sheaveG = new THREE.CylinderGeometry(0.36, 0.36, 0.14, 28); sheaveG.rotateZ(Math.PI / 2);
  const sheave = new THREE.Group(); machine.add(sheave); sheave.position.set(0.3, 0.05, 0);
  edges(sheaveG, mMid, sheave);
  [0, 1, 2, 3].forEach(k => { const r = k * Math.PI / 4; line([[0, Math.cos(r) * 0.36, Math.sin(r) * 0.36], [0, -Math.cos(r) * 0.36, -Math.sin(r) * 0.36]], mSoft, sheave); });

  /* кабина – главный предмет, почти белая; центральные двери, проём – половина ширины */
  const CW = 1.7, CH = 2.4, CD = 1.5, FZ = CD / 2 + 0.1, DW = CW / 4;
  const cab = new THREE.Group(); model.add(cab);
  boxE(CW, CH, CD, 0, CH / 2, 0.1, mHi, fCab, cab);
  boxE(CW - 0.1, 0.04, CD - 0.1, 0, CH - 0.12, 0.1, mHi, fLight, cab);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(CW - 0.12, CH - 0.12), fGlow); glow.position.set(0, CH / 2, -CD / 2 + 0.12); cab.add(glow);
  line([[-CW / 2 + 0.1, 0.95, -CD / 2 + 0.12], [CW / 2 - 0.1, 0.95, -CD / 2 + 0.12]], mHi, cab);
  [-1, 1].forEach(s => line([[s * (CW / 2 + 0.1), -0.15, 0.1], [s * (CW / 2 + 0.1), CH + 0.35, 0.1]], mMid, cab));
  line([[-(CW / 2 + 0.1), CH + 0.35, 0.1], [CW / 2 + 0.1, CH + 0.35, 0.1]], mMid, cab);
  line([[-(CW / 2 + 0.1), -0.15, 0.1], [CW / 2 + 0.1, -0.15, 0.1]], mMid, cab);
  line([[-CW / 4, 0, FZ + 0.005], [-CW / 4, CH - 0.2, FZ + 0.005], [CW / 4, CH - 0.2, FZ + 0.005], [CW / 4, 0, FZ + 0.005]], mHi, cab);
  const doorL = boxE(DW - 0.02, CH - 0.24, 0.03, -DW / 2, (CH - 0.2) / 2, FZ + 0.02, mHi, fDoor, cab);
  const doorR = boxE(DW - 0.02, CH - 0.24, 0.03, DW / 2, (CH - 0.2) / 2, FZ + 0.02, mHi, fDoor, cab);

  /* противовес и канаты */
  const cw = new THREE.Group(); model.add(cw);
  boxE(0.78, 2.2, 0.18, 0, 0, 0, mSoft, null, cw);
  for (let k = 0; k < 7; k++) line([[-0.39, -0.9 + k * 0.3, 0.09], [0.39, -0.9 + k * 0.3, 0.09]], mFaint, cw);
  cw.position.z = -D / 2 + 0.16;
  const ropes = [-0.06, 0, 0.06].map(dx => {
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3));
    const l = new THREE.Line(g, mMid); model.add(l); return { l, dx };
  });

  const target = new THREE.Vector3();
  return {
    update: () => {
      const cabY = state.floor * FH;
      cab.position.y = cabY;
      const cwY = TOP - 4 - cabY * 0.82;
      cw.position.y = cwY;
      sheave.rotation.x = -state.floor * 1.6;
      const shift = state.doors * (DW - 0.02);
      [doorL, doorR].forEach((d, i) => { const x = (i ? 1 : -1) * (DW / 2 + shift); d.e.position.x = x; d.m.position.x = x; });
      fGlow.opacity = 0.06 + state.doors * 0.22;
      ropes.forEach(({ l, dx }) => {
        l.geometry.attributes.position.array.set([dx, cabY + CH + 0.35, 0.1, dx + 0.3, TOP - 1.05, -0.09, dx + 0.3, TOP - 1.05, -0.81, dx, cwY + 1.1, -D / 2 + 0.16]);
        l.geometry.attributes.position.needsUpdate = true;
      });
      clip.constant = state.reveal;
      state.mx += (state.tx - state.mx) * 0.05;
      state.my += (state.ty - state.my) * 0.05;
      state.camY += (state.floor * FH - state.camY) * 0.025;
      model.rotation.y = -0.58 + state.mx * 0.08;
      model.rotation.x = state.my * 0.03;
      /* композиция: на компьютере модель справа (центр ~75 % ширины), на телефоне – по центру ниже текста */
      const mob = mobile();
      const y = state.camY + CH * 0.6;
      const dist = mob ? 40 : 34;
      camera.position.set(Math.sin(0.12) * dist, y + 5, Math.cos(0.12) * dist);
      target.set(mob ? 0 : -7.2, mob ? y + 3.4 : y - 0.4, 0);
      camera.lookAt(target);
    }
  };
};

/* Вход и бесконечные поездки: GSAP-таймлайн по состоянию сцены (не по скроллу) */
const animate = (state) => {
  if (typeof gsap === 'undefined') { Object.assign(state, { reveal: 99, floor: RIDE.start, doors: 1 }); return; }
  let n = 0;
  const ride = () => {
    const to = RIDE.stops[n++ % RIDE.stops.length];
    const dist = Math.abs(to - state.floor);
    gsap.timeline({ onComplete: ride })
      .to(state, { doors: 0, duration: RIDE.doorsClose, ease: 'power2.inOut' })
      .to(state, { floor: to, duration: RIDE.travel + dist * RIDE.perFloor, ease: 'power2.inOut' }, '+=0.2')
      .to(state, { doors: 1, duration: RIDE.doorsOpen, ease: 'power2.inOut' }, '+=0.15')
      .to({}, { duration: RIDE.dwell });
  };
  gsap.timeline()
    .to(state, { reveal: 44, duration: 2.6, ease: 'power2.inOut' }, 0)
    .to(state, { floor: RIDE.start, duration: 3, ease: 'power3.inOut' }, 0.4)
    .to(state, { doors: 1, duration: RIDE.doorsOpen, ease: 'power2.inOut' }, 3.3)
    .add(() => gsap.delayedCall(RIDE.dwell, ride), 4.3);
};

export const mount = (host) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.localClippingEnabled = true;
  host.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 400);
  const state = { reveal: -2, floor: 0, doors: 0, camY: RIDE.start * 3, mx: 0, my: 0, tx: 0, ty: 0, visible: true };
  const object = buildObject(scene, camera, state);
  animate(state);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile() ? 1.5 : 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = mobile() ? 34 : 26;
    camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(host);

  /* курсор слегка поворачивает модель */
  window.addEventListener('pointermove', e => { state.tx = e.clientX / window.innerWidth - 0.5; state.ty = e.clientY / window.innerHeight - 0.5; }, { passive: true });

  /* пауза вне экрана: кадр не рисуется, пока сцена не видна */
  new IntersectionObserver(entries => { state.visible = entries.some(e => e.isIntersecting); }, { rootMargin: '10% 0px' }).observe(host);

  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!state.visible) return;
    object.update();
    renderer.render(scene, camera);
  };
  tick();
  host.classList.add('is-live');
  window.__xray = state; /* для проверки движения в браузере (docs/motion.md → Как проверять) */

  return () => { cancelAnimationFrame(raf); renderer.dispose(); renderer.domElement.remove(); host.classList.remove('is-live'); };
};
