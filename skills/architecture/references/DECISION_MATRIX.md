# Architecture Decision Matrix

Use this after discovery. Repository evidence and constraints win over architectural fashion.

## 1. Existing architecture

| Situation | Default decision |
|---|---|
| Existing architecture is coherent, understood, and meeting its constraints | Preserve it. Improve documentation or enforcement only if there is a concrete gap. |
| Documentation differs from implementation but implementation is healthy and deliberate | Update intent/docs/ADR rather than forcing code back to stale documentation. |
| Implementation violates an important documented boundary with material impact | Restore or revise the boundary deliberately; choose the smaller evidence-backed change. |
| Existing architecture style is unfamiliar but healthy | Preserve it; do not migrate to a preferred style merely for familiarity. |

## 2. Monolith vs services

| Evidence | Default decision |
|---|---|
| Monolith/modular monolith has coherent ownership and acceptable deployment/scale characteristics | Preserve it. Do not split merely because services are fashionable. |
| Service boundary already has independent ownership/deployment/data/scale needs | Preserve or strengthen that real boundary. |
| Proposed service split has no independent operational or ownership reason | Prefer an internal module boundary first. |
| Distributed boundary causes material coordination/latency/consistency cost with no remaining benefit | Consider consolidation, with migration and compatibility planning. |

## 3. Dependency cycles

| Cycle evidence | Default decision |
|---|---|
| Local cycle inside one cohesive responsibility with no material cost | Document or tolerate if appropriate; do not rewrite automatically. |
| Cycle crosses an intended ownership/module boundary | Investigate responsibility placement, contract direction, or shared ownership; break it when the boundary matters. |
| Cycle blocks independent build/test/deploy/change | Prioritize a boundary-safe redesign. |
| Cycle reveals a genuinely shared concept | Consider moving shared ownership to an explicit shared boundary rather than introducing arbitrary interfaces. |

## 4. Shared libraries and abstractions

| Situation | Default decision |
|---|---|
| Shared library is stable infrastructure with clear ownership and broad legitimate use | Preserve it. |
| Shared library mixes unrelated domain responsibilities | Split only when coupling creates material change/ownership cost. |
| Proposed interface/adapter has no second implementation, external boundary, extension point, or testing/constraint need | Do not add it merely for style. |
| External dependency or volatile boundary needs isolation | An adapter/port may be justified. |

## 5. Public contracts

- Preserve compatibility when consumers depend on the current contract unless the change explicitly authorizes a breaking migration.
- Prefer additive/evolutionary changes when they materially reduce migration risk.
- If a breaking change is necessary, define consumers, sequencing, compatibility window, validation, and rollback.
- Do not treat internal implementation details as public contracts unless consumers actually depend on them.

## 6. Events vs synchronous calls

- Preserve synchronous interaction when latency, consistency, failure, and ownership characteristics fit the requirement.
- Use asynchronous events/messages when there is a concrete decoupling, buffering, integration, workflow, or temporal requirement.
- Do not introduce events merely because they appear more decoupled; account for delivery semantics, observability, ordering, retries, and consistency.

## 7. Architecture documentation and ADRs

- Update stale documentation when implementation is the accepted truth.
- Write an ADR when a durable architectural choice or constraint changes.
- Do not create ADR ceremony for trivial implementation details.

## 8. Migration choice

Prefer the least disruptive strategy that preserves correctness and contracts:

~~~text
preserve
-> document/enforce
-> local refactor
-> compatibility layer
-> staged migration
-> broad restructuring only when justified
~~~
