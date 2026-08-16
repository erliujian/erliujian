/* =========================================================
   宝贝成长记 · 时光相册
   功能：瀑布流渲染 / 灯箱查看 / 导航 / 滚动动画
   替换照片：修改 PHOTOS 数组即可（路径相对 index.html）
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 照片数据（按成长阶段分组） ---------- */
  var PHOTOS = [
    { src: "assets/img/img-00-00.jpg", cap: "初来乍到 · 2021.03" },
    { src: "assets/img/img-00-01.jpg", cap: "甜甜的梦 · 2021.03" },
    { src: "assets/img/img-00-02.jpg", cap: "小手小脚 · 2021.04" },
    { src: "assets/img/img-00-03.jpg", cap: "第一次微笑 · 2021.05" },
    { src: "assets/img/img-01-00.jpg", cap: "周岁 · 抓周 · 2022.03" },
    { src: "assets/img/img-01-01.jpg", cap: "周岁 · 切蛋糕 · 2022.03" },
    { src: "assets/img/img-01-02.jpg", cap: "周岁 · 小寿星 · 2022.03" },
    { src: "assets/img/img-01-03.jpg", cap: "周岁 · 生日会 · 2022.03" },
    { src: "assets/img/img-06-00.jpg", cap: "生日 · 吹蜡烛 · 2022.03" },
    { src: "assets/img/img-06-01.jpg", cap: "生日 · 许个愿 · 2022.03" },
    { src: "assets/img/img-06-02.jpg", cap: "生日 · 大蛋糕 · 2022.03" },
    { src: "assets/img/img-06-03.jpg", cap: "生日 · 全家福 · 2022.03" },
    { src: "assets/img/img-02-00.jpg", cap: "学步 · 第一步 · 2022.09" },
    { src: "assets/img/img-02-02.jpg", cap: "学步 · 摇摇晃晃 · 2022.09" },
    { src: "assets/img/img-02-03.jpg", cap: "学步 · 向前走 · 2022.10" },
    { src: "assets/img/img-03-00.jpg", cap: "幼儿园 · 开学啦 · 2023.09" },
    { src: "assets/img/img-03-01.jpg", cap: "幼儿园 · 小伙伴 · 2023.09" },
    { src: "assets/img/img-03-02.jpg", cap: "幼儿园 · 玩耍时光 · 2023.10" },
    { src: "assets/img/img-03-03.jpg", cap: "幼儿园 · 放学啦 · 2023.11" },
    { src: "assets/img/img-04-01.jpg", cap: "童年 · 快乐瞬间 · 2024.06" },
    { src: "assets/img/img-04-03.jpg", cap: "童年 · 夏日时光 · 2024.07" },
    { src: "assets/img/img-05-00.jpg", cap: "小学 · 背上书包 · 2025.09" },
    { src: "assets/img/img-05-01.jpg", cap: "小学 · 上学路上 · 2025.09" },
    { src: "assets/img/img-05-02.jpg", cap: "小学 · 新朋友 · 2025.09" },
    { src: "assets/img/img-05-03.jpg", cap: "小学 · 校园生活 · 2025.10" },
    { src: "assets/img/img-07-00.jpg", cap: "亲子 · 大手牵小手 · 2025.10" },
    { src: "assets/img/img-07-01.jpg", cap: "亲子 · 户外时光 · 2025.10" },
    { src: "assets/img/img-07-02.jpg", cap: "亲子 · 公园漫步 · 2025.11" },
    { src: "assets/img/img-07-03.jpg", cap: "亲子 · 一起看世界 · 2025.12" }
  ];

  /* ---------- 渲染瀑布流 ---------- */
  var masonry = document.getElementById("masonry");
  if (masonry) {
    PHOTOS.forEach(function (p, i) {
      var item = document.createElement("figure");
      item.className = "m-item reveal";
      item.dataset.index = i;
      item.innerHTML =
        '<img src="' + p.src + '" alt="' + p.cap + '" loading="lazy">' +
        '<figcaption class="m-cap">' + p.cap + "</figcaption>";
      masonry.appendChild(item);
    });
  }

  /* ---------- 灯箱 ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCaption");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var current = 0;

  function openLightbox(i) {
    current = (i + PHOTOS.length) % PHOTOS.length;
    var p = PHOTOS[current];
    lbImg.src = p.src;
    lbImg.alt = p.cap;
    lbCap.textContent = p.cap + "（" + (current + 1) + " / " + PHOTOS.length + "）";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(d) { openLightbox(current + d); }

  if (masonry) {
    masonry.addEventListener("click", function (e) {
      var fig = e.target.closest(".m-item");
      if (fig) openLightbox(parseInt(fig.dataset.index, 10));
    });
  }
  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", function () { step(-1); });
  lbNext.addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  /* ---------- 导航：滚动状态 + 移动端菜单 ---------- */
  var nav = document.getElementById("siteNav");
  var backTop = document.getElementById("backTop");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle("scrolled", y > 60);
    backTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    }
  });
  backTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 滚动显现动画 ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
})();
