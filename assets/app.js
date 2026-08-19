/* Pencil Monitor site — shared behaviour.
   Loaded blocking in <head> so the language is set before first paint. */
(function () {
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

    /* top bar picks up a hairline once the page has scrolled */
    var bar = document.querySelector('.bar');
    if (bar) {
      var tick = function () { bar.classList.toggle('stuck', window.scrollY > 4); };
      tick();
      addEventListener('scroll', tick, { passive: true });
    }

    /* FAQ rows: one click toggles, height animates via grid-template-rows */
    document.querySelectorAll('.qa .q').forEach(function (q) {
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', function () {
        var qa = q.closest('.qa');
        var open = qa.classList.toggle('open');
        q.setAttribute('aria-expanded', String(open));
      });
    });

    /* deep link: /support.html#hover-test opens and scrolls to that row */
    function openHash() {
      var id = location.hash.slice(1);
      if (!id) return;
      var qa = document.getElementById(id);
      if (!qa || !qa.classList.contains('qa')) return;
      qa.classList.add('open');
      qa.querySelector('.q').setAttribute('aria-expanded', 'true');
      qa.scrollIntoView({ block: 'center' });
    }
    openHash();
    addEventListener('hashchange', openHash);

    /* fade sections in on first view */
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
