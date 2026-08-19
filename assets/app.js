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
