<div align="center">
  <img src="assets/img/6a5cea2858ba9471c589d6dc_fav_512x512.png" width="108" alt="project-s-clone" />
  <h1>project-s-clone</h1>
  <p><b>Lenval Properties「Project S」页面的离线高保真副本</b><br /><sub>单文件 HTML + 全部资源本地化 · file:// 直开可用 · 前端复刻学习用途</sub></p>
  <p>
    <img src="https://img.shields.io/badge/HTML5-单页-E34F26" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-静态-1572B6" alt="CSS3">
    <img src="https://img.shields.io/badge/GSAP-动效栈-88CE02" alt="GSAP">
    <img src="https://img.shields.io/badge/Lenis-平滑滚动-111111" alt="Lenis">
    <img src="https://img.shields.io/badge/Three.js-WebGL-049EF4" alt="Three.js">
    <img src="https://img.shields.io/badge/用途-仅限学习-F59E0B" alt="用途：仅限学习">
  </p>
  <p>
    <b>简体中文</b> ·
    <a href="README.en.md">English</a>
  </p>
</div>

对 [Lenval Properties](https://www.lenvalproperties.com) 网站中 **Project S** 项目详情页的离线高保真复刻，原页由 Webflow 构建。本仓库把页面连同字体、图片、视频、动效脚本**全部落地为本地静态资源**：断网、`file://` 双击直开，滚动 / 悬停 / 视差 / 光标 / 弹窗行为与原站一致。

复刻的目的只有一个：**逐行读懂这套商业级 Webflow 动效栈**。它同时也是我个人博客「Lenval 编辑风」改版的参考实现。

> ⚠️ **页面设计、图片、字体、视频的版权归原作者 Lenval Properties 所有。** 本仓库仅作个人学习交流，不授予任何许可，严禁商用。详见[版权说明](#-版权说明)。

## 一览

| | |
| --- | --- |
| **原作** | [Lenval Properties](https://www.lenvalproperties.com) · Project S（Webflow） |
| **副本** | 单 `index.html`（≈124 KB）+ 本地化 `assets/`（css / fonts / img / js / media） |
| **动效栈** | GSAP + ScrollTrigger + SplitText + Flip + CustomEase · Lenis 平滑滚动 · barba.js 转场 · Swiper · Three.js |
| **字体** | Helvetica Now Display + Financier Display（woff2 自托管） |
| **访问** | <https://sunfleeting-debug.github.io/project-s-clone/> 或本地直开 |
| **许可** | 无（设计版权归原作，代码仅作学习参考） |

---

## ✨ 特性

### 🎬 原站动效，原样落地

- 页面全部滚动 / 悬停 / 视差 / 光标 / 弹窗行为由 **`assets/js/vendor/site-motion.js`**（原站自己的动效脚本）驱动，未做任何改写。
- 商业授权字体与全部厂商库（GSAP 全家桶、Lenis、barba、Swiper、Three.js）**逐一本地化**，不再请求任何 CDN。

### 🔌 离线兼容垫片（复刻者新增，仅两处）

- **`assets/js/offline-compat.js`**：不实现任何动效，只做三件事——
  1. **预加载看门狗**：动效脚本 15 s 内未收尾时强制收起预加载层（`html.motion-off`），避免内容被永久遮住；
  2. **表单兜底**：`file://` / 本机预览下拦截表单提交并就地提示（原站会 POST 到 Webflow 后端）；
  3. **诊断输出**：控制台核对九个关键库是否就位、Lenis 实例与 ScrollTrigger 数量。
- **`assets/css/offline.css`**：只承担看门狗兜底与表单提示条两件离线特有的事，不参与观感还原。

### 🖥 本地预览

```bash
# file:// 双击 index.html 直开即可；如需静态服务：
python -m http.server 8080
# 打开 http://127.0.0.1:8080
```

---

## 📁 目录结构

```text
project-s-clone/
├── index.html                    原页 HTML，资源链接已改为本地路径
├── .nojekyll                     跳过 GitHub Pages 的 Jekyll 处理
└── assets/
    ├── css/
    │   ├── site.css              原站样式表（原样落地）
    │   ├── offline.css           离线兜底（复刻者新增）
    │   └── vendor/lenis.css      Lenis 官方样式
    ├── fonts/                    Helvetica Now Display / Financier Display（woff2）
    ├── img/                      页面图片、装饰 SVG、favicon
    ├── js/
    │   ├── offline-compat.js     离线兼容垫片（复刻者新增）
    │   └── vendor/               GSAP · ScrollTrigger · SplitText · Flip · CustomEase
    │                             Lenis · barba · Swiper · Three.js · site-motion.js
    └── media/                    视频（webm / mp4）
```

---

## ⚠️ 版权说明

- 本仓库是**学习用途的高保真复刻**，不是原创作品。
- **Lenval Properties** 及 Project S 页面的设计、文案、摄影图片、视频、字体，版权归原作者及其权利人所有；本副本中的使用仅出于个人学习与研究目的。
- 本仓库**不授予任何许可**，请勿将其中任何资源用于商业用途或再分发。
- 如原作者要求移除，将立即处理。
