(function () {
  var APP_STORE_URL = '';

  var KEY = 'pm-lang';
  var root = document.documentElement;

  function pick() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function apply(l, remember) {
    root.setAttribute('data-active', l);
    root.lang = l === 'zh' ? 'zh-Hans' : 'en';
    if (remember) { try { localStorage.setItem(KEY, l); } catch (e) {} }
    if (window.__pmSync) requestAnimationFrame(window.__pmSync);
    document.querySelectorAll('.langsw button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === l));
    });
  }

  apply(pick(), false);
  root.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-active'), false);

    document.querySelectorAll('.langsw button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.set, true); });
    });

    var store = document.getElementById('app-store-link');
    if (store) {
      if (APP_STORE_URL) {
        store.href = APP_STORE_URL;
        store.removeAttribute('aria-disabled');
      } else {
        store.removeAttribute('href');
        store.setAttribute('aria-disabled', 'true');
        store.addEventListener('click', function (e) { e.preventDefault(); });
      }
    }

    var stage = document.querySelector('.stage');
    if (stage && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
      var stageIn = document.querySelector('.stage-in'),
          icon = document.querySelector('.appicon'),
          slot = document.querySelector('.slot'),
          gTitle = document.querySelector('.g-title'),
          gClaim = document.querySelector('.g-claim'),
          date = document.querySelector('.date'),
          hint = document.querySelector('.hint');

      var seg = function (x, a, b) { return Math.min(1, Math.max(0, (x - a) / (b - a))); };
      var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
      var setT = function (el, v) { if (el.__t !== v) { el.__t = v; el.style.transform = v; } };
      var setO = function (el, v) { if (el.__o !== v) { el.__o = v; el.style.opacity = v; } };

      var rise = 32, lastW = 0, lastH = 0, mTop = 0, mH = 1;

      function measure() {
        mTop = stage.offsetTop;
        mH = Math.max(1, stage.offsetHeight - stageIn.offsetHeight);
        slot.style.height = Math.max(gTitle.offsetHeight, gClaim.offsetHeight) + 'px';
        rise = innerWidth <= 640 ? 22 : 32;
        lastW = innerWidth; lastH = innerHeight;
      }

      function frame() {
        var p = Math.min(1, Math.max(0, (scrollY - mTop) / mH));

        var a = easeOut(seg(p, 0, .32));
        setT(icon, 'translate3d(0,' + (-a * rise).toFixed(1) + 'px,0) scale(' + (1 - a * .55).toFixed(3) + ')');

        var b = easeOut(seg(p, .04, .20));
        setT(gTitle, 'translate3d(0,' + (-b * 34).toFixed(1) + 'px,0) scale(' + (1 - b * .12).toFixed(3) + ')');
        setO(gTitle, (1 - seg(p, .05, .18)).toFixed(3));

        var c = easeOut(seg(p, .36, .56));
        setT(gClaim, 'translate3d(0,' + ((1 - c) * 30).toFixed(1) + 'px,0)');
        setO(gClaim, c.toFixed(3));

        setO(date, c.toFixed(3));
        setO(hint, (1 - seg(p, 0, .10)).toFixed(3));
      }

      var pending = false;
      function onScroll() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () { pending = false; frame(); });
      }

      measure(); frame();
      window.__pmSync = function () { measure(); frame(); };
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', function () {
        if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 140) return;
        measure(); frame();
      });
      addEventListener('orientationchange', function () { setTimeout(function () { measure(); frame(); }, 250); });
      addEventListener('load', function () { measure(); frame(); });
      matchMedia('(prefers-color-scheme:dark)').addEventListener('change', function () { measure(); frame(); });
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { measure(); frame(); });
      }
    }

    var bar = document.querySelector('.bar');
    if (bar) {
      var tick = function () { bar.classList.toggle('stuck', window.scrollY > 4); };
      tick();
      addEventListener('scroll', tick, { passive: true });
    }

    document.querySelectorAll('.qa .q').forEach(function (q) {
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', function () {
        var qa = q.closest('.qa');
        var open = qa.classList.toggle('open');
        q.setAttribute('aria-expanded', String(open));
      });
    });

    function openHash() {
      var id = location.hash.slice(1);
      if (!id) return;
      var qa = document.getElementById(id);
      if (!qa || !qa.classList.contains('qa')) return;
      qa.classList.add('open');
      qa.querySelector('.q').setAttribute('aria-expanded', 'true');
      var sec = qa.closest('.reveal');
      if (sec) sec.classList.add('in');
      qa.scrollIntoView({ block: 'center' });
    }
    openHash();
    addEventListener('hashchange', openHash);

    if (!matchMedia('(prefers-reduced-motion:reduce)').matches && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: .1, rootMargin: '0px 0px -6% 0px' });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    }
  });
})();
