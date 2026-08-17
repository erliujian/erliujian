<div> 
<a href="index.html"> index <a/>

</div>

# 👶 宝贝成长记 · 静态成长相册

一个展示孩子成长照片的静态网页，暖色系 + 衬线排版 + 瀑布流相册 + 灯箱查看，响应式适配手机/平板/电脑，无需任何构建工具，双击即可打开。

## 目录结构

```
kids-gallery/
├── index.html        # 页面结构
├── css/style.css     # 全部样式（响应式）
├── js/main.js        # 交互逻辑（灯箱/动画/渲染）
├── assets/img/       # 示例照片（29 张，来自 Bing 图片搜索）
└── README.md
```

## 如何查看

直接用浏览器打开 `index.html` 即可，或用任意静态服务器：

```bash
cd kids-gallery
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 如何替换成自己的照片

1. **相册照片**：把照片放进 `assets/img/`，然后编辑 `js/main.js` 顶部的 `PHOTOS` 数组，
   按 `{ src: "图片路径", cap: "说明文字" }` 的格式增删条目即可，页面会自动渲染瀑布流。

2. **成长足迹（时间轴）**：在 `index.html` 中复制/修改 `<div class="tl-item">` 区块，
   改标题、日期、描述和 `<img>` 的图片路径。

3. **首页背景**：`index.html` 中 Hero 区的 `style="background-image:url('assets/img/img-07-00.jpg')"` 换成自己的全家福。

4. **站点文案**：标题、寄语、页脚文字直接在 `index.html` 里改。

## 说明

- 示例图片来自 Bing 图片搜索（关键词：新生儿、周岁生日、学步、幼儿园、小学生、亲子等），仅作演示，正式使用请替换为自家照片。
- 字体使用 Google Fonts（Noto Serif SC / Noto Sans SC），离线时自动回退到系统中文字体。
