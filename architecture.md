# Architecture

## 🧭 Overview

This project adopts a **feature-first, layered architecture** inspired by Domain-Driven Design. The goal is to keep business rules explicit in the frontend without turning the application into a backend-style system with unnecessary ceremony.

The central business capability is `ride-eligibility`: determining whether a given user can start a ride with a given bike at a given station.

The chosen architecture organizes that capability into clear layers with distinct responsibilities:

- `domain`
- `application`
- `infrastructure`
- `presentation`

This separation is not only structural. It is meant to make the business language, decision points, and dependency flow visible in the codebase.

## 🏗️ Structural View

At the project level, the structure is organized as:

```text
src/
  app/
  features/
    ride-eligibility/
  shared/
  test/
```

Inside the `ride-eligibility` feature, the architecture is layered:

```text
ride-eligibility/
  application/
  domain/
  infrastructure/
  presentation/
  index.ts
```

This gives the project two important forms of separation:

- **by business capability**, through `features`
- **by responsibility**, through the internal layers of each feature

## 🎯 Why This Architecture Was Chosen

The architecture was chosen to support a frontend implementation where business logic is treated as a first-class concern.

The main architectural intention is:

- keep domain rules out of React components
- keep UI orchestration out of the domain
- keep concrete data access replaceable
- keep the feature cohesive from end to end

This is a pragmatic adaptation of DDD to the frontend. It does not try to reproduce backend patterns mechanically. Instead, it preserves the parts that are most valuable in this environment:

- explicit business language
- clear boundaries
- dependency inversion
- separation between read concerns and command concerns

## 🧠 Main Principles Applied

### Feature-First Organization

The project is centered on a business capability rather than on technical folders like `components`, `services`, or `hooks` at the top level.

This improves cohesion and makes it easier to understand the feature end to end.

### Separation Of Concerns

Each layer has a distinct purpose:

- `domain` contains business concepts and rules
- `application` coordinates use cases
- `infrastructure` contains concrete implementations
- `presentation` handles user interaction and rendering

This reduces coupling and prevents responsibilities from leaking across layers.

### Dependency Inversion

The core of the feature does not depend directly on infrastructure details. Concrete implementations are assembled from the outside in the feature composition root.

This makes the architecture more stable and easier to evolve.

### Ubiquitous Language

Concepts such as `RideEligibility`, `PlanType`, `BlockReason`, and `EligibilityResult` reflect the language of the business problem rather than generic technical naming.

This improves readability and makes the model easier to discuss and maintain.

### Explicit Application Actions

The architecture keeps user intention visible through an application use case for checking ride eligibility.

That creates a cleaner boundary between UI flow and domain decision logic.

### Frontend-Oriented Query / Command Separation

The project separates:

- read-side loading of options
- command-side evaluation of eligibility

In practice, React Query handles asynchronous reads, while the eligibility check is executed locally over already available domain entities.

This avoids duplicated responsibilities and fits the frontend runtime better.

## ✅ Architectural Benefits

- **Clarity**: the business flow is easier to follow.
- **Testability**: domain and application logic can be tested without React.
- **Replaceability**: infrastructure can change without rewriting the core model.
- **Cohesion**: all ride-eligibility concerns stay together.
- **Maintainability**: the structure scales better than a generic folder-by-technical-type approach.
- **Academic value**: the architecture makes the design argument visible for study and discussion.

## 📌 Summary

This architecture is justified because it gives the project a clear business center, explicit boundaries, and a maintainable dependency flow.

It uses DDD as a way to structure the frontend around domain meaning, not as a way to increase ceremony. The result is a codebase where business logic, UI orchestration, and infrastructure concerns remain separated while still fitting the realities of a React application.
