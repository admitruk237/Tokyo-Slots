# 🎰 Tokyo Slots

A browser-based slot machine game built with React and TypeScript.

---

## Demo

![Tokyo Slots Demo](./public/demo.gif)

## Features

- 4-reel slot machine with 6 weighted symbols and multipliers up to ×500
- Lever pull animation + sequential reel spin with sound effects
- Win / Lose overlays with animated CountUp and auto-dismiss
- Bet input with live validation, min/max limits and error bubbles
- Balance and settings (bet, mute) persisted via `localStorage`
- Mute toggle
- Fully responsive — works on mobile and desktop

---

## Tech Stack

|                       |                  |
| --------------------- | ---------------- |
| React 19              | UI               |
| TypeScript 6 (strict) | Type safety      |
| Zustand 5             | State management |
| Framer Motion 12      | Animations       |
| Tailwind CSS 4        | Styling          |
| Vite 8                | Build tool       |
| Vitest                | Unit tests       |

Architecture follows **Feature-Sliced Design (FSD)**.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/admitruk237/Tokyo-Slots.git
cd tokyo-slots
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Tests

```bash
npm run test
```

---

## Game Rules

| Combination   | Payout                          |
| ------------- | ------------------------------- |
| 4 of a kind   | `bet × symbol multiplier`       |
| 3 of a kind   | `bet × symbol multiplier × 0.5` |
| Anything else | `0`                             |

### Symbols

| Symbol    | Multiplier | Frequency   |
| --------- | ---------- | ----------- |
| 7️⃣ Seven  | ×500       | Rare        |
| ⛩️ Torii  | ×100       | Uncommon    |
| 🐱 Maneki | ×50        | Uncommon    |
| 🔔 Bell   | ×20        | Common      |
| 🍒 Cherry | ×10        | Common      |
| 🌸 Sakura | ×5         | Most common |
