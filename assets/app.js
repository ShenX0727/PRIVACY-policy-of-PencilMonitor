(function () {
  var APP_STORE_URL = '';

  var LANG = 'pm-lang', THEME = 'pm-theme';
  var root = document.documentElement;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function pickLang() {
    var saved = read(LANG);
    if (saved === 'zh' || saved === 'en') return saved;
    return (navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function pickTheme() {
    var saved = read(THEME);
    return (saved === 'light' || saved === 'dark' || saved === 'auto') ? saved : 'auto';
  }

  function mark(sel, attr, value) {
    document.querySelectorAll(sel).forEach(function (b) {
      var on = b.getAttribute(attr) === value;
      b.setAttribute('aria-pressed', String(on));
      var seg = b.parentElement;
      if (!seg || !seg.classList.contains('seg')) return;
      var kids = [].slice.call(seg.querySelectorAll('button'));
      seg.style.setProperty('--n', kids.length);
      if (!on) return;
      seg.style.setProperty('--i', kids.indexOf(b));
      if (!seg.classList.contains('ready')) {
        requestAnimationFrame(function () { seg.classList.add('ready'); });
      }
    });
  }

  function applyLang(l, remember) {
    root.setAttribute('data-active', l);
    root.lang = l === 'zh' ? 'zh-Hans' : 'en';
    if (remember) store(LANG, l);
    mark('.seg button[data-set]', 'data-set', l);
    if (window.__pmSync) requestAnimationFrame(window.__pmSync);
  }

  var themeTimer;
  function applyTheme(t, remember) {
    if (remember) {
      root.classList.add('theming');
      clearTimeout(themeTimer);
      themeTimer = setTimeout(function () { root.classList.remove('theming'); }, 480);
    }
    if (t === 'auto') { root.removeAttribute('data-theme'); } else { root.setAttribute('data-theme', t); }
    if (remember) store(THEME, t);
    mark('.seg button[data-theme]', 'data-theme', t);
    if (window.__pmSync) requestAnimationFrame(window.__pmSync);
  }

  applyLang(pickLang(), false);
  applyTheme(pickTheme(), false);
  root.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(root.getAttribute('data-active'), false);
    applyTheme(pickTheme(), false);

    document.querySelectorAll('.seg button[data-set]').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-set'), true); });
    });
    document.querySelectorAll('.seg button[data-theme]').forEach(function (b) {
      b.addEventListener('click', function () { applyTheme(b.getAttribute('data-theme'), true); });
    });

    var hint = document.querySelector('.hint');
    if (hint) {
      var fade = function () { hint.classList.toggle('gone', window.scrollY > 40); };
      fade();
      addEventListener('scroll', fade, { passive: true });
    }

    var gear = document.querySelector('.gear'), prefs = document.querySelector('.prefs');
    if (gear && prefs) {
      var setOpen = function (on) {
        prefs.classList.toggle('open', on);
        gear.setAttribute('aria-expanded', String(on));
      };
      setOpen(false);
      gear.addEventListener('click', function (e) {
        e.stopPropagation();
        setOpen(gear.getAttribute('aria-expanded') !== 'true');
      });
      prefs.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', function () { setOpen(false); });
      addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    }

    var store_ = document.getElementById('app-store-link');
    if (store_) {
      if (APP_STORE_URL) {
        store_.href = APP_STORE_URL;
        store_.removeAttribute('aria-disabled');
      } else {
        store_.removeAttribute('href');
        store_.setAttribute('aria-disabled', 'true');
        store_.addEventListener('click', function (e) { e.preventDefault(); });
      }
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
