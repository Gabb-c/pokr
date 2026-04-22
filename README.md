# pokr

**A modern planning poker app for agile teams — built with Angular.**

---

> [!WARNING]
> **pokr is under active development.** Features, APIs, and the data model are still evolving, and breaking changes land frequently on `main`. The hosted version at [pokr.app](https://pokr.app) tracks the latest production deploy and may be reset without notice. A `v1.0.0` tag will mark the first stable release — until then, treat everything here as a work in progress.

## About

pokr is a real-time planning poker tool for distributed agile teams. Create a room, share the link, vote on stories with your team, and reveal estimates together — no signup, no friction.

It's also a deliberate exercise in modern Angular architecture: signal-based state management, zoneless change detection, `resource()` for async data, and a clean split between RxJS (transport) and signals (view state). The codebase is meant to be readable as a reference for how to build a production-grade Angular app in 2026.

## Features

Features are added incrementally. The list below reflects the current roadmap — checked items are live, unchecked items are planned.

- [ ] Create and join rooms via shareable link
- [ ] Real-time vote synchronization across participants
- [ ] Configurable estimation decks (Fibonacci, T-shirt, powers of two)
- [ ] Reveal and reset rounds with one click
- [ ] Vote statistics — average, median, consensus indicator
- [ ] Spectator mode for observers and facilitators
- [ ] Round history within a session
- [ ] Persistent user identity (display name, avatar)
- [ ] Keyboard shortcuts for power users
- [ ] Export session results
- [ ] PWA / offline-capable

See [open issues](https://github.com/Gabb-c/pokr/issues) for the full backlog and current priorities.

## Tech stack

| Layer              | Choice                                   | Why                                                          |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------ |
| Framework          | Angular 21 (zoneless, standalone)        | Signals-first, modern change detection                       |
| State              | Angular Signals + RxJS                   | Signals for view state, RxJS for transport streams           |
| Backend            | Firebase Firestore                       | Real-time listeners without maintaining a server             |
| Styling            | _TBD_                                    | Tailwind or Angular Material — decision pending              |
| Testing            | Vitest (unit) + Playwright (e2e)         | Angular 21's default test runner + modern e2e                |
| Hosting            | Vercel                                   | Zero-config deploys for SPAs                                 |
| CI/CD              | GitHub Actions                           | Lint, test, and deploy on push to `main`                     |

## Architecture

pokr follows a feature-sliced architecture with a clear dependency direction: features depend on `core/` and `shared/`, never on each other.

```
src/app/
├── core/        # Singletons: auth, Firebase setup, app-wide types
├── shared/      # Stateless, reusable UI and utilities
└── features/    # Self-contained features (home, room, ...)
```

The signal/observable boundary is deliberate: Firestore streams live in RxJS-backed services, and components read from signal-based stores scoped to their route. This keeps templates synchronous and view logic simple while leveraging RxJS where it actually earns its keep.

A longer write-up of the architecture lives in [`docs/architecture.md`](./docs/architecture.md) _(coming soon)_.

## Getting started

### Prerequisites

- Node.js 20 or later
- npm 10 or later
- A Firebase project with Firestore enabled

### Local setup

```bash
# Clone the repo
git clone https://github.com/Gabb-c/pokr.git
cd pokr

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# ...then fill in your Firebase config

# Run the dev server
npm start
```

## Contributing

Contributions, suggestions, and bug reports are welcome. While the project is still finding its shape, the fastest way to contribute is to open an issue before submitting a pull request so we can discuss the approach.

A `CONTRIBUTING.md` with coding standards, commit conventions, and branch strategy will land once the project stabilizes.

## License

[MIT](./LICENSE) © [Gabriel](https://github.com/Gabb-c)
