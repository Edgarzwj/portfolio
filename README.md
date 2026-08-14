# Edgar（张万江）| 3D 交互式作品集

> 基于 **React 19 + React Three Fiber + Three.js + GSAP + Vite** 打造的创意 3D 开发者作品集。
> 一座可以"走"进去的手绘风格长廊：推开每一扇门，进入关于我、作品画廊、工作室与联系的房间。

本仓库是 [Tomasz "ITom" Szmajda](https://itomdev.com) 开源作品集模板的二次创作版本，
站点内所有文案、项目与个人信息均已替换为作者 **Edgar（张万江）** 的真实内容。

## ✨ 技术栈

- **React 19** + **React Router v7** — 应用框架与虚拟路由（URL 与 3D 房间状态同步）
- **React Three Fiber / Three.js** — 3D 场景、可步行长廊、房间与手绘纹理
- **@react-three/drei / postprocessing** — 相机控制、后期与性能监控
- **GSAP / ScrollTrigger** — 滚动叙事、油漆揭示（paint-reveal）过渡、卡片翻转动画
- **Vite 7** — 构建与开发服务器
- **Sanity**（可选）— 无头 CMS，未配置时自动回退本地 `FALLBACK` 数据

## 🚀 本地运行

```bash
# 1. 安装依赖（要求 Node.js 20+）
npm install

# 2. 启动开发服务器
npm run dev

# 3. 生产构建与本地预览
npm run build
npm run preview
```

> 提示：项目大量使用高分辨率手绘纹理，本地首次加载可能稍慢；性能与加载评估请始终使用 `build` + `preview`。

## 🗂️ 项目结构

```
src/
├── components/canvas/        # 3D 场景（长廊 + 四个房间 + 背景）
│   ├── corridor/             # 可步行走廊、门、Hero 文字
│   ├── rooms/                # About / Gallery / Studio / Contact
│   └── shaders/              # 自定义 GLSL（油漆揭示等）
├── components/ui/            # DOM 叠层（导航、地图、音频控制、无障碍层）
├── context/                  # 全局状态（场景、音频、成就）
├── hooks/                    # useDocumentMeta、useSanityData 等
├── i18n/                     # 中英双语
└── config/                   # Sanity 配置、纹理预加载清单
```

## 📦 内容来源

作品集中展示的项目均来自作者公开的 GitHub：[github.com/Edgarzwj](https://github.com/Edgarzwj)

- **一太刀 One Strike** — 像素水墨风武士浏览器游戏（移动端）
- **deaify** — 去 AI 化的代码 / 文本工具套件（算法向）
- **novel-to-script** — AI 小说转剧本工具
- **flowboard** — 单文件、零依赖的实时协作白板
- **dagongren-ledger** — 单文件离线记账 + 真实时薪工作台
- **asr-learning-path** — ASR 语音识别学习路线

## 🛰️ 部署

纯静态产物，可部署到任意静态托管（GitHub Pages / Vercel / Netlify / 对象存储）。

## ⚠️ 版权与素材

- 代码基于 MIT 许可（详见 `LICENSE`）。
- 模板中的**手绘纹理、插画、3D 素材版权归 Tomasz Szmajda 所有**（站点文案、项目与个人信息均已替换为 Edgar 的真实内容），
  本仓库仅作二次创作与学习用途。若用于公开或商业展示，请替换为自有素材。
