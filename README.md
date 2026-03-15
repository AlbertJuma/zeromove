# ZeroMove

**Practical decision support for people with limited resources.**

ZeroMove helps users who have little or no money decide what practical action to take next.

## What It Does

Users answer a few simple questions about their situation:
- Where they are right now
- What resources they have access to
- How much time they have
- What would help most
- Their current energy level

The system outputs three concrete actions:
- **One for today** – Something immediate and achievable
- **One for the week** – A short-term goal
- **One skill to focus on** – Building capacity for the future

## Philosophy

This is not motivational content. It is decision guidance.

**Tone:**
- Calm and respectful
- No hustle culture
- No shame or pressure
- No gamification

**Design Principles:**
- Requires no money
- Takes less than 60 minutes per action
- Increases clarity, skill, or opportunity
- Realistic for someone with a phone and basic internet

## Tech Stack

- **Frontend & Backend:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Data:** JSON-based action library (MVP)
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AlbertJuma/zeromove.git
cd zeromove
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

### Deploying to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

Alternatively, use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

## Project Structure

```
zeromove/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Welcome screen (home page)
│   ├── questions/           # Question flow
│   │   └── page.tsx
│   ├── results/             # Action results display
│   │   └── page.tsx
│   ├── api/                 # API routes
│   │   └── actions/
│   │       └── route.ts     # Action matching endpoint
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # Reusable UI components
│   ├── WelcomeScreen.tsx
│   ├── QuestionCard.tsx
│   ├── ActionCard.tsx
│   └── Button.tsx
├── data/                    # Data files
│   └── actions.json         # 30 action library
├── lib/                     # Utility functions
│   └── actionMatcher.ts     # Decision logic
└── public/                  # Static assets
```

## Features

- **5-Question Flow**: Simple, one-question-per-screen flow
- **Smart Matching**: Actions matched based on resources, time, priority, and energy
- **30 Actions**: Comprehensive library covering immediate, short-term, and skill-building actions
- **Mobile-First**: Optimized for phone users with limited data
- **Accessible**: High contrast, clear fonts, simple navigation
- **No Tracking**: No analytics, no user data storage

## Development

### Running Locally

```bash
npm run dev
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## Development Roadmap

- [x] Initialize Next.js project
- [x] Create 30-action library
- [x] Build question flow UI
- [x] Implement decision logic
- [ ] Deploy to Vercel
- [ ] User testing and feedback
- [ ] Accessibility audit
- [ ] Performance optimization

## License

MIT

---

**Created by AlbertJuma**