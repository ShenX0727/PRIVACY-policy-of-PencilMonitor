**简体中文** · [English ↓](#pencil-monitor--website)

# Pencil Monitor — 网站

Pencil Monitor 的对外站点：主页、隐私政策，以及带常见问题的帮助与反馈页。纯静态
HTML，无需构建，由 GitHub Pages 托管。

## 页面地址

**主页**　→　[点此打开](https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/)

```
https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/
```

**隐私政策**　→　[点此打开](https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/privacy.html)

```
https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/privacy.html
```

**帮助与反馈**　→　[点此打开](https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/support.html)

```
https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/support.html
```

> 每个地址下方的代码框右上角有复制按钮，鼠标移上去就会出现，点一下即可复制。
> 想在新标签页打开，按住 `Cmd`（Windows 为 `Ctrl`）再点「点此打开」。

## 文件结构

| 页面 | 文件 | 说明 |
|---|---|---|
| 主页 | `index.html` | 功能介绍与三个按钮：App Store 下载、隐私政策、帮助与反馈 |
| 隐私政策 | `privacy.html` | 单文件，样式脚本图片全部内联，不依赖 `assets/` |
| 帮助与反馈 | `support.html` | 16 条常见问题，点击整行展开 |

`assets/` 存放主页与帮助页共用的样式、脚本与图片（App 图标、favicon、开发者头像、
App Store 徽章）。`privacy.html` 是独立的，不读取其中任何文件。

三个页面都是中英双语。主页和帮助页会按浏览器语言自动选择，也可在右上角手动切换，
选择记在 `localStorage` 里；隐私政策页只按浏览器语言自动选择，没有手动切换。

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

隐私政策原先位于站点根目录，现在根目录是主页，所以**「隐私政策 URL」必须改成
`privacy.html` 那个地址**（就是上面第二个代码框，直接复制粘贴）。「技术支持 URL」
填第三个地址。

## 三处口径需一致

App 包内 `PrivacyInfo.xcprivacy` 的 `NSPrivacyCollectedDataTypes` 为空数组、
`NSPrivacyTracking` 为 `false`，App Store Connect 的「App 隐私」问卷相应选择
**不收集数据**。清单、问卷与 `privacy.html` 三处口径必须一致，改动其中一处，另外
两处也要跟着改。

---

[← 简体中文](#pencil-monitor--网站) · **English**

# Pencil Monitor — Website

The public site for Pencil Monitor: a home page, the privacy policy, and the
help & feedback page with the FAQ. Static HTML, no build step, served by GitHub
Pages.

## Addresses

**Home**　→　[open it](https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/)

```
https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/
```

**Privacy policy**　→　[open it](https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/privacy.html)

```
https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/privacy.html
```

**Help & Feedback**　→　[open it](https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/support.html)

```
https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/support.html
```

> Each address sits in a code box with a copy button in its top-right corner —
> hover over the box and it appears. To open a link in a new tab, hold `Cmd`
> (`Ctrl` on Windows) while clicking.

## Layout

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Feature tour and three buttons: App Store, Privacy Policy, Help &amp; Feedback |
| Privacy policy | `privacy.html` | One self-contained file — styles, script and images all inline, no `assets/` |
| Help &amp; Feedback | `support.html` | 16 questions, each row expands on click |

`assets/` holds the stylesheet, script and images shared by the home and help
pages (app icon, favicon, developer avatars, App Store badges). `privacy.html`
stands alone and reads none of them.

All three pages are bilingual. The home and help pages pick a language from the
browser and can be switched in the top-right corner, which is remembered in
`localStorage`; the privacy policy follows the browser only, with no manual
switch.

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

The privacy policy used to live at the site root; the root is now the home page,
so **the Privacy Policy URL must be changed** to the `privacy.html` address —
the second code box above, ready to copy. The Support URL takes the third.

## Keeping the three in sync

`PrivacyInfo.xcprivacy` inside the app bundle has an empty
`NSPrivacyCollectedDataTypes` array and `NSPrivacyTracking` set to `false`. The
App Privacy questionnaire in App Store Connect must therefore answer
**Data Not Collected**. The manifest, the questionnaire and `privacy.html` have
to agree; change one and the other two need updating too.
