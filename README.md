# Anxiety Toolkit

A calm, mobile-friendly personal coping-skills companion. Not a clinical or diagnostic app — a private, editable toolkit for recognizing anxiety early, choosing a coping tool in the moment, tracking self-care habits, journaling, and communicating more effectively with the people in your life.

## Features

- **Home / Check-in** — quick intensity check-in with tools recommended for how you're feeling
- **Toolkit** — the four categories (Predicting & Preventing, Identifying & Feeling, Self Care, Communication) as browsable, editable, favoritable cards
- **I need help now** — a guided 3-step in-the-moment flow with a short timer
- **Tracker** — a Sun–Sat weekly log of notes and tools used, with a gentle consistency indicator
- **Journal** — freeform dated entries with optional tags
- **Communication scripts** — short phrases you can pull up and read in a hard conversation

All data (toolkit edits, journal entries, tracker logs, favorites) is stored locally on your device only — no accounts, no server.

## Development

```bash
npm install
npm run dev
```

## Editing the toolkit

The starter toolkit content lives in `src/data/toolkitData.ts`. Edit it directly, or use the in-app editor (pencil icon on the Toolkit screen) to add, rename, or remove tools — your edits are saved locally and layered on top of the starter data.
