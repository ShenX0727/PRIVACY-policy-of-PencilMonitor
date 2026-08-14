[English](#pencil-monitor-privacy-policy) · [简体中文](#pencil-monitor-隐私政策)

# Pencil Monitor Privacy Policy

The privacy policy for Pencil Monitor, used for the Privacy Policy URL field in
App Store Connect.

The policy itself is in [index.html](index.html), in both English and Chinese.
It picks a language from the browser and can be switched at the top of the page.

Live at:

```
https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/
```

## Keeping the three in sync

`PrivacyInfo.xcprivacy` inside the app bundle has an empty
`NSPrivacyCollectedDataTypes` array and `NSPrivacyTracking` set to `false`. The
App Privacy questionnaire in App Store Connect must therefore answer
**Data Not Collected**. The manifest, the questionnaire and this policy have to
agree; change one and the other two need updating too.

---

# Pencil Monitor 隐私政策

Pencil Monitor 的隐私政策，供 App Store Connect 的「隐私政策 URL」使用。

正文见 [index.html](index.html)，中英双语。页面会按浏览器语言选择显示语种，也可以
在顶部手动切换。

访问地址：

```
https://shenx0727.github.io/PRIVACY-policy-of-PencilMonitor/
```

## 三处口径需一致

App 包内 `PrivacyInfo.xcprivacy` 的 `NSPrivacyCollectedDataTypes` 为空数组、
`NSPrivacyTracking` 为 `false`，App Store Connect 的「App 隐私」问卷相应选择
**不收集数据**。清单、问卷与本政策三处口径必须一致，改动其中一处，另外两处也要
跟着改。
