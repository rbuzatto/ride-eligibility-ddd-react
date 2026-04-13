# Ride Eligibility DDD React

Frontend study project that explores how Domain-Driven Design principles can be implemented in a React application.

The project models a single business capability: checking whether a given user can start a ride with a given bike at a given station. It is also meant to serve as a TCC-oriented reference for a feature-first, layered frontend architecture where domain rules stay explicit and React remains focused on orchestration and rendering.

## 🎯 Purpose

This project exists to demonstrate a pragmatic DDD approach in the frontend:

- business rules live in the domain layer
- user intentions are represented as application use cases
- infrastructure details stay replaceable
- the presentation layer is organized around queries, form state, commands, and view models

The current implementation uses in-memory data and local evaluation, which makes it easier to study the architecture without needing a backend.

## 🧰 Tech Stack

- React 19
- TypeScript
- Vite
- React Query
- Tailwind CSS
- Vitest
- Biome

## 🚀 Getting Started

### Prerequisites

- Node.js
- `pnpm`

If you do not have `pnpm` installed yet:

```bash
npm install -g pnpm
```

### Install Dependencies

```bash
pnpm install
```

### Start The Development Server

```bash
pnpm dev
```

Then open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## 📜 Available Scripts

### Run The App In Development

```bash
pnpm dev
```

### Create A Production Build

```bash
pnpm build
```

### Preview The Production Build

```bash
pnpm preview
```

### Run Tests In Watch Mode

```bash
pnpm test
```

### Run Tests Once

```bash
pnpm test:run
```

### Run Linting

```bash
pnpm lint
```

### Format The Codebase

```bash
pnpm format
```

## 🏗️ Project Structure

The codebase follows a feature-first structure:

```text
src/
  app/
  features/
    ride-eligibility/
      application/
      domain/
      infrastructure/
      presentation/
      index.ts
  shared/
  test/
```

The `ride-eligibility` feature is the main bounded area of the project and is internally split into:

- `domain`: entities, value objects, domain types, results, and domain services
- `application`: use cases, ports, and query contracts
- `infrastructure`: in-memory data, repositories, and query service implementations
- `presentation`: React pages, components, queries, form state, commands, and view models

For a detailed explanation of the architectural choices, see [ddd-project-structure.md](./ddd-project-structure.md).

## ⚙️ How The Feature Works

At a high level, the flow is:

1. the presentation layer loads available users, bikes, and stations
2. the user selects one option of each
3. the application use case receives the selected domain entities
4. the domain service evaluates ride eligibility
5. the result is mapped into a UI-friendly view model and rendered

This keeps the read side and the decision side separate while preserving a clear domain model.

## 📝 Notes

- The project currently uses in-memory data, so no backend setup is required.
- React Query is used for the read side.
- The eligibility check itself is a local command over already loaded entities.

## 📚 Documentation

- [architecture.md](./architecture.md)

## 📄 License

This project is currently intended for study and academic exploration.
