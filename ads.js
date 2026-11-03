/*
 * TrueFinds ad slots (Build Board BB-43; CODE_INBOX Tue 3 Nov 2026 ad slots entry and Jon's 7:45 AM correction).
 * Placements: guide_mid (after section 2 of a guide), guide_end (end of a guide), home_footer (above the homepage
 * footer, after the FAQ). Real Deals has its own copy in the app (src/components/ads/AdSlot.tsx). Max 2 per page.
 *
 * Fill order per slot, decided by the app (/api/ads/slot): a sponsor booked for that placement today, then a Google
 * AdSense manual unit, then nothing. While ADS_ENABLED is off the app answers "none" and this script adds nothing.
 * A slot is filled only when it comes near the screen, so a filled slot appears below what the reader is looking at
 * and an empty one takes no space. AdSense loads only when a slot is filled with it, non-personalized only.
 * Counts only: an impression or a sponsor click is sent with the placement and kind, nothing about the reader.
 */
(function () {
  if (window.__tfAds) return;
  window.__tfAds = true;
  var MAX = 2;
  var test = /[?&]ads=test(&|$)/.test(location.search) && !/(^|\.)truefinds\.ai$/.test(location.hostname);

  function track(event, props) {
    try {
      var id = 'anonymous';
      try { id = localStorage.getItem('tf_visitor_id') || 'anonymous'; } catch (e) {}
      var body = JSON.stringify({ event: event, distinct_id: id, props: props });
      if (navigator.sendBeacon) navigator.sendBeacon('/api/compare/event', new Blob([body], { type: 'application/json' }));
    } catch (e) {}
  }

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  // Where each placement goes on this page.
  function spots() {
    var out = [];
    var home = document.querySelector('[data-tf-ad="home_footer"]');
    if (home) out.push({ placement: 'home_footer', node: home });
    var article = document.querySelector('main article');
    if (article) {
      var h2 = article.querySelectorAll(':scope > h2');
      if (h2.length >= 3) {
        var mid = el('div', { 'data-tf-ad': 'guide_mid' });
        article.insertBefore(mid, h2[2]);
        out.push({ placement: 'guide_mid', node: mid });
      }
      var end = el('div', { 'data-tf-ad': 'guide_end' });
      article.appendChild(end);
      out.push({ placement: 'guide_end', node: end });
    }
    // Guides 2.0 layout: numbered section heads inside main.g2, then a "Keep reading" block.
    var g2 = !article && document.querySelector('main.g2');
    if (g2) {
      var heads = g2.querySelectorAll('.g2-sec-head');
      if (heads.length >= 3) {
        var mid2 = el('div', { 'data-tf-ad': 'guide_mid' });
        heads[2].parentNode.insertBefore(mid2, heads[2]);
        out.push({ placement: 'guide_mid', node: mid2 });
      }
      var end2 = el('div', { 'data-tf-ad': 'guide_end' });
      var related = g2.querySelector('.g2-related');
      if (related) related.parentNode.insertBefore(end2, related);
      else g2.appendChild(end2);
      out.push({ placement: 'guide_end', node: end2 });
    }
    return out.slice(0, MAX);
  }

  var CSS = '.tf-ad{max-width:760px;margin:28px auto;box-sizing:border-box;font-family:Inter,system-ui,sans-serif}' +
    '.tf-ad-label{display:block;font-size:13px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;color:#475569;margin:0 0 6px}' +
    '.tf-ad-card{display:flex;gap:14px;align-items:center;border:1px solid #D9E2EC;border-radius:14px;background:#fff;padding:14px;color:#1A3C5E;text-decoration:none;min-height:44px}' +
    '.tf-ad-card img{width:96px;height:96px;object-fit:cover;border-radius:10px;flex:0 0 auto}' +
    '.tf-ad-card b{display:block;font-size:17px;line-height:1.35}' +
    '.tf-ad-card span{display:block;font-size:15px;color:#334155;margin-top:4px}' +
    '.tf-ad:has(ins[data-ad-status="unfilled"]){display:none}' +
    '@media (max-width:480px){.tf-ad-card img{width:72px;height:72px}}';

  function style() {
    if (document.getElementById('tf-ad-css')) return;
    var s = el('style', { id: 'tf-ad-css' });
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function sponsor(node, f) {
    style();
    var box = el('aside', { class: 'tf-ad', 'aria-label': 'Sponsored' });
    box.appendChild(el('span', { class: 'tf-ad-label' }, 'Sponsored'));
    var a = el('a', { class: 'tf-ad-card noskim', href: f.link, rel: 'sponsored noopener', target: '_blank' });
    if (f.image) a.appendChild(el('img', { src: f.image, alt: '', loading: 'lazy', width: '96', height: '96' }));
    var t = el('div', {});
    t.appendChild(el('b', {}, f.headline));
    t.appendChild(el('span', {}, f.sponsor));
    a.appendChild(t);
    a.addEventListener('click', function () { track('ad_click', { placement: f.placement, kind: 'sponsor' }); });
    box.appendChild(a);
    node.appendChild(box);
    track('ad_impression', { placement: f.placement, kind: 'sponsor' });
  }

  var adsenseLoaded = false;
  function adsense(node, f) {
    style();
    var box = el('aside', { class: 'tf-ad', 'aria-label': 'Advertisement' });
    box.appendChild(el('span', { class: 'tf-ad-label' }, 'Advertisement'));
    box.appendChild(el('ins', { class: 'adsbygoogle', style: 'display:block', 'data-ad-client': f.client, 'data-ad-slot': f.slot, 'data-ad-format': 'auto', 'data-full-width-responsive': 'true' }));
    node.appendChild(box);
    var q = (window.adsbygoogle = window.adsbygoogle || []);
    // Non-personalized ads only (CODE_INBOX Tue 3 Nov, item 4).
    q.requestNonPersonalizedAds = 1;
    if (!adsenseLoaded) {
      adsenseLoaded = true;
      document.head.appendChild(el('script', { async: '', crossorigin: 'anonymous', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(f.client) }));
    }
    try { q.push({}); } catch (e) {}
    track('ad_impression', { placement: f.placement, kind: 'adsense' });
  }

  function fill(list, answer) {
    for (var i = 0; i < list.length; i++) {
      var f = answer && answer.slots && answer.slots[list[i].placement];
      if (!f || f.kind === 'none') continue;
      if (f.kind === 'sponsor') sponsor(list[i].node, f);
      else if (f.kind === 'adsense') adsense(list[i].node, f);
    }
  }

  function start() {
    var list = spots();
    if (!list.length) return;
    var asked = false;
    function ask() {
      if (asked) return;
      asked = true;
      if (test) {
        var t = { slots: {} };
        for (var i = 0; i < list.length; i++) t.slots[list[i].placement] = { kind: 'sponsor', placement: list[i].placement, sponsor: 'Test Sponsor Co.', headline: 'A test sponsor card, shown on test hosts only', image: '', link: 'https://truefinds.ai/how-we-earn' };
        fill(list, t);
        return;
      }
      var p = list.map(function (s) { return s.placement; }).join(',');
      fetch('/api/ads/slot?p=' + encodeURIComponent(p), { credentials: 'same-origin' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (a) { fill(list, a); })
        .catch(function () {});
    }
    if (!('IntersectionObserver' in window)) { ask(); return; }
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) if (entries[i].isIntersecting) { io.disconnect(); ask(); return; }
    }, { rootMargin: '600px 0px' });
    for (var j = 0; j < list.length; j++) io.observe(list[j].node);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
