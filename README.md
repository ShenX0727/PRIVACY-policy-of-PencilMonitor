**English** · [简体中文](README.zh-CN.md)

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
