[English](#pencil-monitor--website) · [简体中文](#pencil-monitor--网站)

# Pencil Monitor — Website

The public site for Pencil Monitor: a home page, the privacy policy, and the
support page with the FAQ. Static HTML, no build step, served by GitHub Pages.

| Page | File | URL |
|---|---|---|
| Home | `index.html` | `https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/` |
| Privacy policy | `privacy.html` | `.../privacy.html` |
| Support | `support.html` | `.../support.html` |

`assets/` holds the shared stylesheet, the shared script, and the images
(app icon, favicon, developer avatars). Every page is bilingual: it picks a
language from the browser and can be switched in the top-right corner, which is
remembered in `localStorage`.

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

Pencil Monitor 的对外站点：主页、隐私政策，以及带常见问题的技术支持页。纯静态
HTML，无需构建，由 GitHub Pages 托管。

| 页面 | 文件 | 地址 |
|---|---|---|
| 主页 | `index.html` | `https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/` |
| 隐私政策 | `privacy.html` | `.../privacy.html` |
| 技术支持 | `support.html` | `.../support.html` |

`assets/` 存放共用样式、共用脚本与图片（App 图标、favicon、开发者头像）。三个
页面均为中英双语，按浏览器语言自动选择，也可在右上角手动切换，选择会记在
`localStorage` 里。

## App Store Connect

隐私政策原先位于站点根目录，改版后**需要把 App Store Connect 里的「隐私政策
URL」改为上表中的 `privacy.html` 地址**，并把「技术支持 URL」指向 `support.html`。

## 三处口径需一致

App 包内 `PrivacyInfo.xcprivacy` 的 `NSPrivacyCollectedDataTypes` 为空数组、
`NSPrivacyTracking` 为 `false`，App Store Connect 的「App 隐私」问卷相应选择
**不收集数据**。清单、问卷与 `privacy.html` 三处口径必须一致，改动其中一处，另外
两处也要跟着改。
