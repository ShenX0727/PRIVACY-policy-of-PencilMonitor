[English](#pencil-monitor--website) · [简体中文](#pencil-monitor--网站)

# Pencil Monitor — Website

The public site for Pencil Monitor: a home page, the privacy policy, and the
help & feedback page with the FAQ. Static HTML, no build step, served by GitHub Pages.

| Page | File | URL |
|---|---|---|
| Home | `index.html` | `https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/` |
| Privacy policy | `privacy.html` | `.../privacy.html` |
| Help &amp; Feedback | `support.html` | `.../support.html` |

`assets/` holds the shared stylesheet, the shared script, and the images
(app icon, favicon, developer avatars). Every page is bilingual: it picks a
language from the browser and can be switched in the top-right corner, which is
remembered in `localStorage`.

The home page carries three buttons: **App Store**, **Privacy Policy** and
**Help & Feedback**.

## Filling in the App Store link

The download button is wired up but has no address yet. Once the app is live, put
the URL in one place — `APP_STORE_URL` at the top of `assets/app.js`:

```js
var APP_STORE_URL = 'https://apps.apple.com/app/id0000000000';
```

The badge then opens that address in a new tab. While the constant is empty the
badge still renders, but clicking it does nothing.

The badge itself is Apple's own artwork, pulled from Apple Marketing Tools:
`assets/appstore-{en,zh}-{black,white}.svg` — English and Simplified Chinese,
black for light mode and white for dark. Apple's guidelines forbid recolouring,
stretching or adding effects to it, so the stylesheet only sets its height and
keeps at least 10% of that height as clear space around it. Replace the files
rather than restyling them if a different locale is ever needed.

## App Store Connect

The privacy policy used to live at the site root, so **the Privacy Policy URL in
App Store Connect must be updated** to the `privacy.html` address above. The
Support URL should point at `support.html`.

## Keeping the three in sync

`PrivacyInfo.xcprivacy` inside the app bundle has an empty
`NSPrivacyCollectedDataTypes` array and `NSPrivacyTracking` set to `false`. The
App Privacy questionnaire in App Store Connect must therefore answer
**Data Not Collected**. The manifest, the questionnaire and `privacy.html` have
to agree; change one and the other two need updating too.

---

# Pencil Monitor — 网站

Pencil Monitor 的对外站点：主页、隐私政策，以及带常见问题的帮助与反馈页。纯静态
HTML，无需构建，由 GitHub Pages 托管。

| 页面 | 文件 | 地址 |
|---|---|---|
| 主页 | `index.html` | `https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/` |
| 隐私政策 | `privacy.html` | `.../privacy.html` |
| 帮助与反馈 | `support.html` | `.../support.html` |

`assets/` 存放共用样式、共用脚本与图片（App 图标、favicon、开发者头像）。三个
页面均为中英双语，按浏览器语言自动选择，也可在右上角手动切换，选择会记在
`localStorage` 里。

主页上有三个按钮：**App Store 下载**、**隐私政策**、**帮助与反馈**。

## 填入 App Store 链接

下载按钮已经接好线，只差地址。上架后把链接填在一处即可——`assets/app.js` 顶部的
`APP_STORE_URL`：

```js
var APP_STORE_URL = 'https://apps.apple.com/app/id0000000000';
```

填好后徽章会在新标签页打开该地址。常量为空时徽章照常显示，但点击不跳转。

徽章用的是苹果官方素材（Apple Marketing Tools），共四份：
`assets/appstore-{en,zh}-{black,white}.svg`——中英各一套，浅色模式用黑底、深色
模式用白底。苹果规范禁止改色、拉伸或叠加效果，因此样式表只设定高度，并在四周
留出不少于高度 10% 的净空。要换语种就直接换文件，不要改样式。

## App Store Connect

隐私政策原先位于站点根目录，改版后**需要把 App Store Connect 里的「隐私政策
URL」改为上表中的 `privacy.html` 地址**，并把「技术支持 URL」指向 `support.html`。

## 三处口径需一致

App 包内 `PrivacyInfo.xcprivacy` 的 `NSPrivacyCollectedDataTypes` 为空数组、
`NSPrivacyTracking` 为 `false`，App Store Connect 的「App 隐私」问卷相应选择
**不收集数据**。清单、问卷与 `privacy.html` 三处口径必须一致，改动其中一处，另外
两处也要跟着改。
