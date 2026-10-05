---
name: architecture
description: Audits, explains, and evolves software architecture from repository evidence. Use when reviewing system structure, module or service boundaries, dependency direction, public contracts, data flow, coupling, cycles, ADRs, architecture drift, change impact, or migration strategy without imposing a preferred architecture style.
license: MIT
compatibility: Works with software repositories across languages and deployment styles; validation depends on the target repository's actual build, runtime, deployment, and contract tooling.
metadata:
  author: Turpial AI Academy
  version: "0.5.1"
---

# architecture

## Operating flow

~~~text
DISCOVER -> DECIDE -> IMPLEMENT -> VALIDATE -> REPORT
~~~

## Purpose

Understand how a software system is actually structured, where its boundaries and contracts are, how dependencies and data move through it, where meaningful architecture drift exists, and how the system can evolve without degrading healthy design constraints.

The objective is architecture fitness for the repository's real requirements and constraints, not adoption of a fashionable architecture style.

## Non-negotiable rules

- Discover before changing architecture.
- Use repository evidence. Documentation describes intent; code, dependency relationships, runtime/deployment behavior, data flow, and contracts show implementation reality.
- Preserve healthy existing boundaries and constraints unless evidence establishes a reason to change them.
- Do not prescribe microservices, DDD, hexagonal, clean/layered architecture, event-driven design, CQRS, or another style by default.
- Do not infer real boundaries from folder names alone.
- Treat cycles, high coupling, large modules, and shared libraries as evidence to investigate, not automatic rewrite orders.
- Separate observed facts from interpretation and recommendations.
- Prefer the smallest architecture-safe change that satisfies the requirement.
- Keep architecture scope distinct from environment/toolchain, test strategy, security controls, and CI/CD policy.
- Do not report a skipped or unavailable validation as passed.

## Minimum-sufficient evidence

Select depth from the changed architecture surface and evidence health; an unchanged session boundary does not require reconstructing the entire system.

### Bounded amendment

Use the fast path to clarify an existing observation, evidence link, or model/edge record in a healthy current-state architecture artifact when responsibilities, real boundaries, ownership, dependency direction, public contracts, data flow/persistence, and runtime/deployment topology remain unchanged.

1. Locate the authoritative existing model and the affected boundary, dependency edge, or observation.
2. Inspect the minimum affected source/dependency/contract evidence to confirm the model still matches implementation. Documentation alone proves intent, not current implementation.
3. Amend only the affected record or report section. Preserve unrelated model areas, decisions, ADRs, artifacts, and still-valid evidence; do not rebuild the whole dependency graph or inventory.
4. Revalidate the changed record plus mandatory invariants: responsibilities, boundaries, dependencies, data and integrations stay clear, evidence-backed, and free of speculative components.
5. Report what changed, evidence reused with provenance/scope, evidence invalidated and why, freshly observed/executed checks, and assumptions/inferences separately. Recollection is not evidence.

### Deep path and evidence invalidation

Use the deep path for a new model, unclear scope, unhealthy artifacts, contradictions or missing durable evidence, or an actual change to boundaries, ownership, dependency direction, public API/schema/event contracts, data flow/persistence, migration, runtime/deployment topology, security isolation, or availability/rollback risk. Trace affected consumers and required cross-cutting invariants before judging fitness; preserve healthy unrelated architecture.

Reuse evidence only while its source identity, boundary/edge, consumers, contract, data/runtime scope, and validation conditions remain covered. A relevant source mutation or failed invariant invalidates the affected observation and dependent claims; freshly observe the changed relationships and execute required contract/runtime checks. Assumptions are not validation, and a fresh turn alone does not invalidate durable proof.

Load references by trigger: architecture standard/discovery model for new, unhealthy or ambiguous models; decision matrix for structural alternatives; review checklist for changed boundaries/contracts or the full gate; ADR guide only for a durable architectural decision. Templates are optional for missing artifacts; a local clarification does not require a new ADR or template replay.

## Discover

For new or materially uncertain architecture work, read [ARCHITECTURE_STANDARD.md](references/ARCHITECTURE_STANDARD.md) and use [DISCOVERY_MODEL.md](references/DISCOVERY_MODEL.md) before making architecture-policy decisions. A bounded amendment starts with the affected existing record and implementation evidence.

Inventory, as applicable:

- README, architecture docs, ADRs, design notes, ownership docs, and diagrams;
- workspace/package manifests, monorepo configuration, modules, packages, services, applications, and libraries;
- entry points, public APIs, schemas, events/messages, persistence boundaries, and external integrations;
- imports, package dependencies, build graph, generated clients, shared libraries, and cross-cutting infrastructure;
- deployment units, processes, containers, serverless functions, queues, databases, caches, and runtime communication paths;
- tests and CI/deployment constraints only as evidence of architecture contracts, without taking over their separate policy domains.

Build an evidence-backed current-state model:

~~~text
system/context
  -> deployable units
  -> logical boundaries
  -> modules/packages/services
  -> dependency direction
  -> public contracts
  -> data/event flow
  -> persistence/external systems
  -> ownership/constraints
~~~

Record contradictions between documented intent and implementation reality before judging drift.

## Decide

Use [DECISION_MATRIX.md](references/DECISION_MATRIX.md) when a material finding requires preserve/change alternatives.

For each material finding:

1. state the evidence;
2. identify the affected boundary, contract, dependency, data flow, or constraint;
3. determine whether the behavior is intentional, healthy, tolerated debt, or harmful drift;
4. assess change impact and tradeoffs;
5. choose preserve, document, constrain, refactor, split, merge, invert, migrate, or defer based on evidence;
6. prefer the smallest architecture-safe change.

Do not turn aesthetic disagreement into architecture work.

## Implement

Use [REVIEW_CHECKLIST.md](references/REVIEW_CHECKLIST.md) for affected architecture changes and gate checks; a bounded record clarification retains only applicable checks and mandatory invariants.

Common outcomes may include:

- align dependency direction with an existing boundary;
- move a responsibility to the boundary that already owns it;
- extract or formalize a public contract when multiple consumers already depend on it;
- remove an accidental cross-boundary dependency;
- add an adapter only when an actual boundary or external dependency justifies it;
- consolidate duplicated architecture policy where ownership is ambiguous;
- stage a migration with compatibility, sequencing, validation, and rollback points;
- update architecture documentation or an ADR when the durable decision changed.

Use [ADR_GUIDE.md](references/ADR_GUIDE.md) when a durable architectural decision changes. A healthy model clarification does not require an ADR. Assets under [assets/README.md](assets/README.md) are templates, not mandatory ceremony.

## Validate

Validation must match the changed architecture surface.

When applicable, verify:

- affected build/test/type/schema/contract checks;
- forbidden or newly constrained dependency directions;
- public API/schema/event compatibility;
- data flow and persistence behavior;
- deployment/runtime topology when a deployable boundary changed;
- migration compatibility and rollback assumptions;
- architecture documentation/ADR consistency with implementation.

Inspect the resulting diff and repository status. Confirm no unrelated environment, testing, security, or delivery refactor was introduced merely to make the architecture look uniform.

## Report

Report:

1. observed architecture and evidence;
2. documented intent and any contradictions;
3. boundaries, contracts, dependencies, and data flows affected;
4. material drift/risks, with impact explained rather than merely labeled;
5. decisions and tradeoffs;
6. changes made or proposed;
7. validation actually executed and results;
8. blocked or skipped checks;
9. migration/rollback notes when behavior or contracts change;
10. open questions and remaining risks.

For amendments, identify preserved model areas and distinguish reused, invalidated, and fresh evidence from assumptions.

Keep observed facts separate from recommendations.

## Detailed references

- [Architecture Standard](references/ARCHITECTURE_STANDARD.md)
- [Discovery Model](references/DISCOVERY_MODEL.md)
- [Decision Matrix](references/DECISION_MATRIX.md)
- [ADR Guide](references/ADR_GUIDE.md)
- [Review Checklist](references/REVIEW_CHECKLIST.md)
