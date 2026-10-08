import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;

/* ---------- Smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
(window as any).__lenis = lenis;

// Anchor links through Lenis
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
  if (!a) return;
  const id = a.getAttribute('href')!;
  if (id.length < 2) return;
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', id);
});

/* ---------- Reveal on enter ---------- */
const io = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    }
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

/* ---------- Headlines: reveal + paint ---------- */
document.querySelectorAll('[data-split]').forEach((el) => io.observe(el));
const paintIO = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        const el = en.target as HTMLElement;
        setTimeout(() => el.classList.add('is-painted'), el.dataset.split === 'now' ? 350 : 250);
        paintIO.unobserve(el);
      }
    }
  },
  { rootMargin: '0px 0px -15% 0px', threshold: 0.2 },
);
document.querySelectorAll('.h1, .h2, .h3, [data-paint]').forEach((el) => {
  if (el.querySelector('em, .paint') || el.hasAttribute('data-paint')) paintIO.observe(el);
});

if (!reduce) {
  /* ---------- Parallax media ---------- */
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((wrap) => {
    const img = wrap.querySelector('img');
    if (!img) return;
    const amt = parseFloat(wrap.dataset.parallax || '12');
    gsap.fromTo(img, { yPercent: -amt }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- Hero zoom-out ---------- */
  document.querySelectorAll<HTMLElement>('[data-hero-media]').forEach((m) => {
    gsap.fromTo(m, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'expo.out' });
    gsap.to(m, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: m.parentElement, start: 'top top', end: 'bottom top', scrub: true } });
  });

  /* ---------- Magnetic buttons ---------- */
  if (fine) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const strength = 0.22;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * strength);
        yTo((e.clientY - r.top - r.height / 2) * strength);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }
}

/* ---------- Counters ---------- */
document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const to = parseFloat(el.dataset.count!);
  const from = parseFloat(el.dataset.from || '0');
  const dec = (el.dataset.count!.split('.')[1] || '').length;
  if (reduce) { el.textContent = to.toFixed(dec).replace('.', ','); return; }
  const obj = { v: from };
  el.textContent = from.toFixed(dec).replace('.', ',');
  gsap.to(obj, {
    v: to,
    duration: parseFloat(el.dataset.duration || '1.8'),
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    onUpdate: () => { el.textContent = obj.v.toFixed(dec).replace('.', ','); },
  });
});

/* ---------- Scroll progress lines (timelines) ---------- */
document.querySelectorAll<HTMLElement>('[data-progress-line]').forEach((line) => {
  const fill = line.querySelector<HTMLElement>('[data-progress-fill]');
  const host = line.closest<HTMLElement>('[data-progress-host]') || line;
  if (!fill) return;
  if (reduce) { fill.style.transform = 'scaleY(1)'; return; }
  gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: host, start: 'top 65%', end: 'bottom 65%', scrub: true } });
  host.querySelectorAll<HTMLElement>('[data-progress-step]').forEach((step) => {
    ScrollTrigger.create({ trigger: step, start: 'top 65%', onEnter: () => step.classList.add('is-active'), onLeaveBack: () => step.classList.remove('is-active') });
  });
});

/* ---------- Generic in-view toggles (for CSS/SVG animations) ---------- */
document.querySelectorAll<HTMLElement>('[data-inview]').forEach((el) => {
  ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: () => el.classList.add('is-inview') });
});

window.addEventListener('load', () => ScrollTrigger.refresh());
