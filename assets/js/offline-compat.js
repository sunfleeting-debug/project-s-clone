/* =============================================================================
 * offline-compat.js —— 离线副本的兼容垫片
 *
 * 本文件**不实现任何动效**。页面上的全部滚动/悬停/视差/光标/弹窗行为都由
 * assets/js/vendor/site-motion.js（原站自己的动效脚本，原样落地）驱动。
 *
 * 这里只做三件离线环境必需、而原站不需要的事：
 *   1. 预加载看门狗：动效脚本若在超时内未收尾，强制收起预加载层，
 *      避免内容被永久遮住（对应 offline.css 的 html.motion-off 规则）。
 *   2. 表单兜底：原站表单 POST 到 Webflow 后端，file:// 下无后端，
 *      拦截提交并就地提示，避免把页面跳走。
 *   3. 诊断输出：把关键库是否就位打到控制台，便于核对还原是否完整。
 * ========================================================================== */
(function () {
  'use strict';

  var LOADER_TIMEOUT = 15000;   // ms，超过即认为预加载卡住
  var root = document.documentElement;

  /* ---------- 1. 预加载看门狗 ---------- */
  function preloaderStillBlocking() {
    var pre = document.querySelector('[data-preloader]');
    if (pre) {
      var cs = getComputedStyle(pre);
      if (cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity || '1') > 0.05) {
        // 已播完的预加载会被 gsap 设成 display:none
        var t = pre.querySelector('[data-preloader-percent]');
        if (!t || t.textContent.trim() === '100%') return true;
      }
    }
    var master = document.querySelector('[data-master-preloader]');
    if (master && getComputedStyle(master).display !== 'none') {
      // 短路径：主人层通常会在几帧内被移除
      return !!document.querySelector('[data-preloader]');
    }
    return false;
  }

  function armWatchdog() {
    window.setTimeout(function () {
      if (preloaderStillBlocking()) {
        root.classList.add('motion-off');
        console.warn('[offline-compat] 预加载层超时未收尾（' + LOADER_TIMEOUT + 'ms），已强制收起。'
          + '这通常意味着 site-motion.js 没跑起来。');
      }
    }, LOADER_TIMEOUT);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', armWatchdog);
  else armWatchdog();

  /* ---------- 2. 表单兜底 ---------- */
  // 只在「本地来源」生效：file:// 直开，或本机静态预览服务（127.0.0.1 / localhost）。
  // 这两种场景都没有后端，提交必然失败或把页面跳走，所以就地拦下。
  function isLocalOrigin() {
    var h = location.hostname;
    return location.protocol === 'file:'
      || h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '';
  }
  document.addEventListener('submit', function (e) {
    if (!isLocalOrigin()) return;
    e.preventDefault();
    e.stopPropagation();
    var form = e.target;
    var note = form.querySelector('.offline-form-note');
    if (!note) {
      note = document.createElement('div');
      note.className = 'offline-form-note';
      form.appendChild(note);
    }
    note.textContent = '离线副本：表单已通过前端校验，但没有后端可提交。（原站会 POST 到 Webflow/CRM）';
  }, true);

  /* ---------- 3. 诊断 ---------- */
  window.setTimeout(function () {
    var libs = ['gsap', 'ScrollTrigger', 'SplitText', 'CustomEase', 'Flip', 'Lenis', 'Swiper', 'barba', 'THREE'];
    var miss = libs.filter(function (n) { return !window[n]; });
    var ok = libs.filter(function (n) { return !!window[n]; });
    console.log('[offline-compat] 已就位：' + ok.join(', '));
    if (miss.length) console.warn('[offline-compat] 缺失：' + miss.join(', '));
    console.log('[offline-compat] lenis 实例：' + (window.lenis ? '有' : '无'));
    console.log('[offline-compat] ScrollTrigger 触发器：' + (window.ScrollTrigger ? window.ScrollTrigger.getAll().length : '-'));
  }, 3000);
})();
