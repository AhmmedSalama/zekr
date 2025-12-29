# 🌙 Zekr – Islamic Content Platform


## 📖 Overview

**Zekr** is a dynamic web application built with **Next.js** that delivers a smooth and integrated experience for Islamic content, including:[1]

- Quran recitation by a variety of well‑known reciters.[1]
- Online reading of the Mushaf with a clear, readable font.[1]
- Audio lessons and lectures from trusted scholars and teachers.[1]
- Islamic stories and reflections inspired by the Quran and real life.[1]
- Daily adhkar and supplications for morning, evening, after prayer, and ruqyah.[1]

***

## 🖥 Pages and Main Components

| Route | Main Component | Description |
|-------|----------------|-------------|
| `/` | `Home` | Landing page with featured content and links to all sections. [1] |
| `/lessons` | `LessonsPlayer` | Audio lessons and lectures with search and navigation between episodes. [1] |
| `/quran` | `QuranPlayer` | Quran audio player with playback controls, looping, and navigation between surahs. [1] |
| `/mushaf` | `MushafViewer` | Online Mushaf reader with clear typography and navigation between surahs and ayahs. [1] |
| `/stories` | `StoriesContent` | Islamic stories and reflections with Schema.org structured data for better SEO. [1] |
| `/azkar` | `AzkarContent` | Daily adhkar and duas such as morning, evening, after prayer, and ruqyah. [1] |
| `/reciter/[identifier]` | `ReciterPage` | Dedicated page for a specific reciter with full playback controls, surah search, navigation, and looping. [1] |

***

## ⚡ Features

- Fully responsive **UI** optimized for mobile, tablet, and desktop devices.[1]
- Modern styling using **Tailwind CSS** for a clean and smooth design.[1]
- Comprehensive **SEO** support: metadata, Open Graph, Twitter Cards, and Schema.org structured data.[1]
- Quran data fetched from the [Alquran Cloud API](https://alquran.cloud/api).[1]
- Rich audio controls: play, pause, volume control, mute, and loop.[1]
- Built‑in live search within lessons and surahs for quick access.[1]

***

## 🛠 Tech Stack

- **Next.js 14** (App Router)[1]
- **TypeScript**[1]
- **React Hooks** (`useState`, `useEffect`, `useRef`)[1]
- **Tailwind CSS**[1]
- **Next/Image** for optimized image rendering[1]
- **Quran API**: [alquran.cloud](https://alquran.cloud/api)[1]
- **Structured Data**: Schema.org for better search engine understanding.[1]
- Advanced **SEO**: Open Graph, Twitter Cards, and rich metadata.[1]

***

## 🚀 Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/AhmmedSalama/zekr
cd zekr
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open `http://localhost:3000` in your browser to view the app.[1]
