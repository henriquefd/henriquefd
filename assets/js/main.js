/* Henrique Freitas Delfino · portfólio
   Sem dependências. Tudo aqui é aprimoramento: a página funciona sem JS. */
(() => {
  'use strict';
  const doc = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const darkMq = window.matchMedia('(prefers-color-scheme: dark)');
  const lang = (doc.lang || 'pt-BR').startsWith('pt') ? 'pt-BR' : 'en-US';

  /* ---------- tema ---------- */
  const themeBtn = $('[data-theme-toggle]');
  const effectiveTheme = () => {
    const t = doc.getAttribute('data-theme');
    return t === 'light' || t === 'dark' ? t : (darkMq.matches ? 'dark' : 'light');
  };
  const themeListeners = [];
  const syncThemeMeta = () => {
    const isDark = effectiveTheme() === 'dark';
    if (themeBtn) themeBtn.setAttribute('aria-pressed', String(isDark));
    themeListeners.forEach((fn) => fn());
  };
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* armazenamento indisponível */ }
      syncThemeMeta();
    });
  }
  darkMq.addEventListener?.('change', syncThemeMeta);
  syncThemeMeta();

  /* ---------- menu (telas estreitas) ---------- */
  const navBtn = $('[data-nav-toggle]');
  const navList = $('[data-nav-list]');
  if (navBtn && navList) {
    const setOpen = (open) => {
      navBtn.setAttribute('aria-expanded', String(open));
      navList.classList.toggle('is-open', open);
    };
    navBtn.addEventListener('click', () => setOpen(navBtn.getAttribute('aria-expanded') !== 'true'));
    navList.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navBtn.getAttribute('aria-expanded') === 'true') { setOpen(false); navBtn.focus(); }
    });
    document.addEventListener('click', (e) => {
      if (navBtn.getAttribute('aria-expanded') === 'true' && !e.target.closest('.nav')) setOpen(false);
    });
  }

  /* ---------- troca de idioma preserva a seção ---------- */
  // index.html explícito faz o link funcionar abrindo o arquivo direto;
  // na web ele sai do endereço, que fica /henriquefd/ e /henriquefd/en/
  const web = /^https?:$/.test(location.protocol);
  $$('[data-lang-link]').forEach((a) => {
    const clean = () => {
      let base = a.getAttribute('href').split('#')[0];
      if (web) base = base.replace(/index\.html$/, '') || './';
      a.setAttribute('href', base + location.hash);
    };
    clean();
    a.addEventListener('click', clean);
  });

  /* ---------- progresso e seção ativa ---------- */
  const bar = $('[data-progress]');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = doc.scrollHeight - window.innerHeight;
      if (bar) bar.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const spyLinks = new Map($$('[data-spy]').map((a) => [a.dataset.spy, a]));
  if ('IntersectionObserver' in window && spyLinks.size) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        spyLinks.forEach((a) => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        const a = spyLinks.get(en.target.id);
        if (a) { a.classList.add('is-active'); a.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyLinks.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- atrasos escalonados das figuras ---------- */
  $$('.matrix tbody tr').forEach((tr, r) => $$('td', tr).forEach((td, c) => td.style.setProperty('--d', r * 45 + c * 30)));
  $$('.budget-fill, .hbar-fill, .season-bar span').forEach((el) => {
    const i = $$(':scope > *', el.closest('[role="list"]')).indexOf(el.closest('[role="listitem"]'));
    el.style.setProperty('--d', Math.max(0, i) * 80);
  });
  $$('.sir-row').forEach((row, i) => $$('.sir-bar > span', row).forEach((s, j) => s.style.setProperty('--d', i * 70 + j * 120)));
  $$('.layers > .layer').forEach((l, i) => l.style.setProperty('--d', i * 90));

  /* ---------- revelação ao rolar ---------- */
  const revealEls = $$('[data-reveal], .fig');
  if ('IntersectionObserver' in window && !reduce.matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- abertura ---------- */
  const hero = $('.hero');
  if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-ready')));

  /* ---------- contagem dos números (só fora da tela inicial) ---------- */
  const nf = new Intl.NumberFormat(lang);
  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduce.matches && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; cio.unobserve(el);
        const end = Number(el.dataset.count); const final = el.textContent; const t0 = performance.now(); const dur = 1400;
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 4);
          el.textContent = nf.format(Math.round(end * e));
          if (p < 1) requestAnimationFrame(step); else el.textContent = final;
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight) cio.observe(el);
    });
  }

  /* ---------- matriz de confiança: destaque de linha ---------- */
  $$('[data-matrix]').forEach((tbl) => {
    $$('tbody tr', tbl).forEach((tr) => {
      tr.addEventListener('mouseenter', () => { tbl.classList.add('is-focus'); tr.classList.add('is-hot'); });
      tr.addEventListener('mouseleave', () => { tbl.classList.remove('is-focus'); tr.classList.remove('is-hot'); });
      tr.addEventListener('click', () => {
        const on = !tr.classList.contains('is-hot');
        $$('tbody tr', tbl).forEach((r) => r.classList.remove('is-hot'));
        tbl.classList.toggle('is-focus', on); tr.classList.toggle('is-hot', on);
      });
    });
  });

  /* ---------- turno: uma passada por entrada na tela (< 5 s) ---------- */
  $$('[data-turn]').forEach((list) => {
    const steps = $$('.turn-step', list);
    let timer = null; let i = 0;
    const clear = () => steps.forEach((s) => s.classList.remove('is-on', 'is-done'));
    const stop = () => { clearTimeout(timer); timer = null; };
    const run = () => {
      stop(); clear(); i = 0;
      const tick = () => {
        steps.forEach((s, k) => { s.classList.toggle('is-on', k === i); s.classList.toggle('is-done', k < i); });
        i += 1;
        if (i <= steps.length) timer = setTimeout(tick, 620);
        else steps.forEach((s) => { s.classList.remove('is-on'); s.classList.add('is-done'); });
      };
      tick();
    };
    if (reduce.matches || !('IntersectionObserver' in window)) return;
    const tio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) run(); else { stop(); clear(); } });
    }, { threshold: 0.55 });
    tio.observe(list);
  });

  /* ---------- copiar e-mail ---------- */
  const live = $('[data-live]');
  $$('[data-copy]').forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = btn.dataset.done;
        if (live) live.textContent = btn.dataset.done + ': ' + btn.dataset.copy;
        setTimeout(() => { btn.textContent = label; }, 1800);
      } catch (e) {
        window.location.href = 'mailto:' + btn.dataset.copy;
      }
    });
  });

  /* ---------- Fig. 0: interferência de duas fontes ---------- */
  const field = $('[data-field]');
  if (field) {
    const canvas = $('canvas', field);
    const ctx = canvas.getContext('2d', { alpha: true });
    const t1 = $('.field-tick.t1', field);
    const t2 = $('[data-s2]', field);
    const pauseBtn = $('[data-field-pause]', field);
    let W = 0, H = 0, dpr = 1, ph = 0, last = 0, raf = 0;
    let inView = true, paused = reduce.matches, pointer = false;
    const s1 = { x: 0.3, y: 0.5 };
    const s2 = { x: 0.7, y: 0.5 };
    const target = { x: 0.7, y: 0.5 };
    let ink = '#191814', signal = '#b42328';
    const readColors = () => {
      const cs = getComputedStyle(doc);
      ink = cs.getPropertyValue('--ink').trim() || ink;
      signal = cs.getPropertyValue('--signal').trim() || signal;
    };
    const resize = () => {
      const r = field.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const draw = () => {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const step = W < 520 ? 7 : 8;
      const lambda = Math.max(26, Math.min(44, W / 13));
      const k = (2 * Math.PI) / lambda;
      const x1 = s1.x * W, y1 = s1.y * H, x2 = s2.x * W, y2 = s2.y * H;
      const max = step - 1.4;
      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.86;
      const pad = 14;
      for (let y = pad; y < H - pad; y += step) {
        const dy1 = y - y1, dy2 = y - y2;
        for (let x = pad; x < W - pad; x += step) {
          const dx1 = x - x1, dx2 = x - x2;
          const a = Math.sin(k * Math.sqrt(dx1 * dx1 + dy1 * dy1) - ph) + Math.sin(k * Math.sqrt(dx2 * dx2 + dy2 * dy2) - ph);
          const s = (a * a * 0.25) * max;
          if (s > 0.35) ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = signal; ctx.lineWidth = 1.5;
      [[x1, y1], [x2, y2]].forEach(([x, y]) => {
        ctx.fillStyle = signal;
        ctx.beginPath(); ctx.arc(x, y, 3.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.stroke();
      });
      if (t1) { t1.style.left = (s1.x * 100) + '%'; t1.style.top = (s1.y * 100) + '%'; }
      if (t2) { t2.style.left = (s2.x * 100) + '%'; t2.style.top = (s2.y * 100) + '%'; }
    };
    const loop = (t) => {
      raf = 0;
      if (paused || !inView || document.hidden) return;
      const dt = Math.min(0.05, (t - (last || t)) / 1000);
      if (t - last < 30) { raf = requestAnimationFrame(loop); return; }
      last = t;
      ph += dt * 2.4;
      if (!pointer) {
        const τ = t / 1000;
        target.x = 0.68 + 0.06 * Math.sin(τ * 0.35);
        target.y = 0.5 + 0.16 * Math.sin(τ * 0.23);
      }
      s2.x += (target.x - s2.x) * 0.08;
      s2.y += (target.y - s2.y) * 0.08;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !paused && inView) { last = 0; raf = requestAnimationFrame(loop); } };
    const moveTo = (e) => {
      const r = field.getBoundingClientRect();
      pointer = true;
      target.x = Math.min(0.94, Math.max(0.06, (e.clientX - r.left) / r.width));
      target.y = Math.min(0.94, Math.max(0.06, (e.clientY - r.top) / r.height));
      if (paused) { s2.x = target.x; s2.y = target.y; draw(); }
    };
    field.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') moveTo(e); });
    field.addEventListener('pointerdown', (e) => { if (!e.target.closest('button')) moveTo(e); });
    field.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') pointer = false; });
    if (pauseBtn) {
      const setPaused = (p) => {
        paused = p;
        pauseBtn.setAttribute('aria-pressed', String(p));
        pauseBtn.setAttribute('aria-label', p ? pauseBtn.dataset.labelPlay : pauseBtn.dataset.labelPause);
        if (!p) start();
      };
      setPaused(paused);
      pauseBtn.addEventListener('click', () => setPaused(!paused));
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((en) => { inView = en[0].isIntersecting; if (inView) start(); }, { threshold: 0.02 }).observe(field);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(field);
    else window.addEventListener('resize', resize);
    themeListeners.push(() => { readColors(); draw(); });
    readColors(); resize();
    field.classList.add('is-on');
    start();
  }
})();
